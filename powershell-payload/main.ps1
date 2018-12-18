$code=@'
using System;
using System.Runtime.InteropServices;

public static class Keyboard{

    [DllImport("user32.dll", CharSet = CharSet.Auto, ExactSpelling = true, CallingConvention = CallingConvention.Winapi)]
    public static extern short GetKeyState(int keyCode);

    public static bool Numlock{
        get{
            return (((ushort)GetKeyState(0x90)) & 0xffff) != 0;
        }
    }

     public static bool CapsLock{
         get{
            return (((ushort)GetKeyState(0x14)) & 0xffff) != 0;
        }
     }

    public static bool ScrollLock{
        get{
            return (((ushort)GetKeyState(0x91)) & 0xffff) != 0;
        }
    }
}

'@
Add-Type $code
$wsh = New-Object -ComObject WScript.Shell

# Constants
$BIT = "ScrollLock"
$FRAME = "NumLock"

function convertToBinary($text) {
  return [System.Text.Encoding]::UTF8.GetBytes($text) | %{ [System.Convert]::ToString($_,2).PadLeft(8,'0') }
}

function getState([string]$key) {
  return [Keyboard]::$key
}

function setState([string]$key, [bool]$value) {
  while ((getState($key)) -ne $value) {
    $wsh.SendKeys("{$key}")
  }
}

function sendBit($state) {
  setState $FRAME $false
  setState $BIT $state
  setState $FRAME $true

  $interrupted = $false;
  while(getState($FRAME) -eq $true) {
    if ((getState($BIT)) -ne $state) {
      $interrupted = $true;
    }
  }

  if ($interrupted) {
    echo "interrupted!!"
  }
}

function sendByte($byte) {
  foreach ($bitNum in $byte.toCharArray()) {
    $bitState = if($bitNum -eq "1") { $true } else { $false }

    Write-Host -noNewline $bitNum;

    sendBit($bitState)
  }
}

function sendBinary($binary) {
  foreach ($byte in $binary) {
    sendByte($byte)
    # Write-Host "byte complete"
  }
}

function sendText($data) {
  $binaryData = convertToBinary($data);
  sendBinary($binaryData)
}


sendText("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus erat vel gravida gravida. Etiam in enim diam. Etiam non purus nisi. Curabitur nulla nisl, egestas eget ipsum at, tincidunt aliquet enim. Donec tempus, metus quis interdum pulvinar, nisl urna maximus mi, in bibendum urna magna ac quam. Ut egestas eget magna vitae volutpat. Duis tristique neque at tellus consectetur volutpat.")
