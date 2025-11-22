mod commands;
mod db;

use rusqlite::Connection;
use std::sync::Mutex;

struct AppState {
    conn: Mutex<Connection>,
}

impl AppState {
    fn new() -> Self {
        Self {
            conn: Mutex::new(db::init()),
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState::new())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::create_page_command,
            commands::get_pages_command,
            commands::delete_page_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
