/* Automatically generated nanopb header */
/* Generated by nanopb-0.3.9.2 at Sat Jan 12 22:10:13 2019. */

#ifndef PB_EVENTS_KEYPRESS_PB_H_INCLUDED
#define PB_EVENTS_KEYPRESS_PB_H_INCLUDED
#include <pb.h>

/* @@protoc_insertion_point(includes) */
#if PB_PROTO_HEADER_VERSION != 30
#error Regenerate this file with the current version of nanopb generator.
#endif

#ifdef __cplusplus
extern "C" {
#endif

/* Struct definitions */
typedef struct _events_KeyPress {
    int32_t key_code;
/* @@protoc_insertion_point(struct:events_KeyPress) */
} events_KeyPress;

/* Default values for struct fields */

/* Initializer values for message structs */
#define events_KeyPress_init_default             {0}
#define events_KeyPress_init_zero                {0}

/* Field tags (for use in manual encoding/decoding) */
#define events_KeyPress_key_code_tag             1

/* Struct field encoding specification for nanopb */
extern const pb_field_t events_KeyPress_fields[2];

/* Maximum encoded size of messages (where known) */
#define events_KeyPress_size                     11

/* Message IDs (where set with "msgid" option) */
#ifdef PB_MSGID

#define KEYPRESS_MESSAGES \


#endif

#ifdef __cplusplus
} /* extern "C" */
#endif
/* @@protoc_insertion_point(eof) */

#endif
