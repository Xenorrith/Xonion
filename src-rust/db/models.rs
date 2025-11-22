use serde::{Serialize, Deserialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct Page {
    pub id: i32,
    pub title: String,
    pub parent_id: Option<i32>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Block {
    pub id: i32,
    pub page_id: i32,
    pub type_: String,
    pub content: String,
}
