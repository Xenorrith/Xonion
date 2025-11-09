// @generated automatically by Diesel CLI.

diesel::table! {
    blocks (id) {
        id -> Nullable<Integer>,
        page_id -> Integer,
        block_type -> Text,
        content -> Text,
        position -> Text,
    }
}

diesel::table! {
    pages (id) {
        id -> Nullable<Integer>,
        title -> Text,
        emoji -> Text,
        created_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(blocks -> pages (page_id));

diesel::allow_tables_to_appear_in_same_query!(blocks, pages,);
