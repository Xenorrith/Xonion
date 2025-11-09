use diesel::prelude::*;
use crate::schema::{pages, blocks};

#[derive(Queryable, serde::Serialize)]
pub struct Page {
    pub id: i32,
    pub title: String,
    pub emoji: String,
    pub created_at: String,
}

#[derive(Insertable, serde::Deserialize)]
#[diesel(table_name = pages)]
pub struct NewPage {
    pub title: String,
    pub emoji: String,
}

#[derive(Queryable, serde::Serialize)]
pub struct Block {
    pub id: i32,
    pub page_id: i32,
    pub block_type: String,
    pub content: String,
    pub position: String,
}

#[derive(Insertable, serde::Deserialize)]
#[diesel(table_name = blocks)]
pub struct NewBlock {
    pub page_id: i32,
    pub block_type: String,
    pub content: String,
    pub position: String,
}
