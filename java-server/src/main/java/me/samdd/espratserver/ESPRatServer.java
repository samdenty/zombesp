package me.samdd.espratserver;

import io.moquette.broker.Server;
import me.samdd.espratserver.handlers.InterceptMessageHandler;
import org.apache.log4j.FileAppender;
import org.apache.log4j.Logger;
import org.apache.log4j.PatternLayout;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ESPRatServer {

    public static final Logger LOGGER = Logger.getLogger(ESPRatServer.class);

    public static void main(String[] args) throws IOException {
        final File baseDir = new File("Logs");
        if(!baseDir.exists()) baseDir.mkdir();

        Logger.getLogger("io.moquette").addAppender(new FileAppender(new PatternLayout(), new File(baseDir, String.format("%s.txt", new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date()))).getPath()));

        new ESPRatServer().start();
    }

    private Server mqttBroker;

    private void start() {
        Runtime.getRuntime().addShutdownHook(new Thread(this::stop));

        mqttBroker = new Server();

        try {
            mqttBroker.startServer(new File(getClass().getResource("/moquette.conf").getFile()));
            mqttBroker.addInterceptHandler(new InterceptMessageHandler());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void stop() {
        mqttBroker.stopServer();
    }
}
