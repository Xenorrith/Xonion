use serde::{Deserialize, Serialize};
use tauri::State;

use crate::db::models::Page;
use crate::db::service::{create_page, delete_page, get_pages};
use crate::AppState;

#[derive(Debug, Serialize, Deserialize)]
pub enum MessageType {
    Success,
    Warning,
    Error,
    Info,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Message<T> {
    data: T,
    text: String,
    message_type: MessageType,
}

#[tauri::command]
pub fn get_pages_command(state: State<AppState>, id: Option<i32>) -> Message<Vec<Page>> {
    let conn = state.conn.lock().unwrap();
    let pages = get_pages(&conn, id).unwrap();

    return Message::<Vec<Page>> {
        data: pages,
        text: "Pages fetched".to_string(),
        message_type: MessageType::Info,
    };
}

#[tauri::command]
pub fn create_page_command(
    state: State<AppState>,
    title: String,
    parent_id: Option<i32>,
) -> Message<Page> {
    let conn = state.conn.lock().unwrap();
    let page = create_page(&conn, title, parent_id).unwrap();

    return Message::<Page> {
        data: page,
        text: "Page created".to_string(),
        message_type: MessageType::Success,
    };
}

#[tauri::command]
pub fn delete_page_command(state: State<AppState>, id: i32) -> Message<()> {
    let conn = state.conn.lock().unwrap();
    delete_page(&conn, id).unwrap();

    return Message::<()> {
        data: (),
        text: "Page deleted".to_string(),
        message_type: MessageType::Success,
    };
}
