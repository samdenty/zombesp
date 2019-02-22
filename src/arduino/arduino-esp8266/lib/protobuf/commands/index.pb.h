/* Automatically generated nanopb header */
/* Generated by nanopb-0.3.9.2 at Sat Jan 12 22:10:13 2019. */

#ifndef PB_COMMANDS_INDEX_PB_H_INCLUDED
#define PB_COMMANDS_INDEX_PB_H_INCLUDED
#include <pb.h>

#include "Keyboard.pb.h"

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Enum definitions */
typedef enum _commands_MessageEvent_EventName {
    commands_MessageEvent_EventName_PressKey = 0,
    commands_MessageEvent_EventName_TypeText = 1
} commands_MessageEvent_EventName;
#define _commands_MessageEvent_EventName_MIN commands_MessageEvent_EventName_PressKey
#define _commands_MessageEvent_EventName_MAX commands_MessageEvent_EventName_TypeText
#define _commands_MessageEvent_EventName_ARRAYSIZE ((commands_MessageEvent_EventName)(commands_MessageEvent_EventName_TypeText+1))

/* Struct definitions */
typedef struct _commands_Empty {
    char dummy_field;
/* @@protoc_insertion_point(struct:commands_Empty) */
} commands_Empty;

typedef struct _commands_MessageEvent {
    commands_MessageEvent_EventName event;
    int32_t id;
    pb_callback_t message;
/* @@protoc_insertion_point(struct:commands_MessageEvent) */
} commands_MessageEvent;

/* Default values for struct fields */

/* Initializer values for message structs */
#define commands_Empty_init_default              {0}
#define commands_MessageEvent_init_default       {_commands_MessageEvent_EventName_MIN, 0, {{NULL}, NULL}}
#define commands_Empty_init_zero                 {0}
#define commands_MessageEvent_init_zero          {_commands_MessageEvent_EventName_MIN, 0, {{NULL}, NULL}}

/* Field tags (for use in manual encoding/decoding) */
#define commands_MessageEvent_event_tag          1
#define commands_MessageEvent_id_tag             2
#define commands_MessageEvent_message_tag        3

/* Struct field encoding specification for nanopb */
extern const pb_field_t commands_Empty_fields[1];
extern const pb_field_t commands_MessageEvent_fields[4];

/* Maximum encoded size of messages (where known) */
#define commands_Empty_size                      0
/* commands_MessageEvent_size depends on runtime parameters */

/* Message IDs (where set with "msgid" option) */
#ifdef PB_MSGID

#define INDEX_MESSAGES \


#endif

#ifdef __cplusplus
} /* extern "C" */
#endif
/* @@protoc_insertion_point(eof) */

#endif
