use super::models::Page;
use rusqlite::{params, Connection};

pub fn get_pages(conn: &Connection, id: Option<i32>) -> Result<Vec<Page>, rusqlite::Error> {
    let mut stmt = conn
        .prepare("SELECT * FROM pages WHERE parent_id IS (?1)")
        .unwrap();

    let pages = stmt
        .query_map(params![id], |row| {
            Ok(Page {
                id: row.get(0).unwrap(),
                title: row.get(1).unwrap(),
                parent_id: row.get(2).unwrap(),
            })
        })
        .unwrap()
        .collect::<Result<Vec<Page>, rusqlite::Error>>();

    pages
}

pub fn create_page(
    conn: &Connection,
    title: String,
    parent_id: Option<i32>,
) -> Result<Page, rusqlite::Error> {
    let mut stmt = conn
        .prepare("INSERT INTO pages (title, parent_id) VALUES (?1, ?2)")
        .unwrap();

    stmt.execute(params![title, parent_id]).unwrap();

    let page = Page {
        id: conn.last_insert_rowid() as i32,
        title,
        parent_id: None,
    };

    Ok(page)
}

pub fn delete_page(conn: &Connection, id: i32) -> Result<(), rusqlite::Error> {
    let mut stmt = conn
        .prepare("DELETE FROM pages WHERE id = ?1 OR parent_id = ?1")
        .unwrap();

    stmt.execute(params![id]).unwrap();

    Ok(())
}
