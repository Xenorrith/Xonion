pub mod models;
pub mod service;

pub fn init() -> rusqlite::Connection {
    let conn = rusqlite::Connection::open("db.sqlite").unwrap();
    conn.execute(
        "CREATE TABLE IF NOT EXISTS pages (
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            parent_id INTEGER
        )",
        [],
    ).unwrap();
    conn.execute(
        "CREATE TABLE IF NOT EXISTS blocks (
            id INTEGER PRIMARY KEY,
            page_id INTEGER NOT NULL,
            type_ TEXT NOT NULL,
            content TEXT NOT NULL
        )",
        [],
    ).unwrap();

    conn
}