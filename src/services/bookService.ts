import { pool } from '../config/database';
import { Book } from '../models/bookModel';

export class BookService {
  static async addBook(book: Book): Promise<void> {
    const sql = 'INSERT INTO Inventory (title, author, genre, publication_date, isbn) VALUES (?, ?, ?, ?, ?)';
    await pool.query(sql, [book.title, book.author, book.genre, book.publication_date, book.isbn]);
  }

  static async getBooks(filter: Partial<Book>): Promise<Book[]> {
    let sql = 'SELECT * FROM Inventory WHERE 1=1';
    const params: string[] = [];

    if (filter.title) {
      sql += ' AND title LIKE ?';
      params.push(`%${filter.title}%`);
    }
    if (filter.author) {
      sql += ' AND author LIKE ?';
      params.push(`%${filter.author}%`);
    }
    if (filter.genre) {
      sql += ' AND genre LIKE ?';
      params.push(`%${filter.genre}%`);
    }
    if (filter.publication_date) {
      sql += ' AND publication_date = ?';
      params.push(filter.publication_date);
    }

    const [rows] = await pool.query(sql, params);
    return rows as Book[];
  }

  static async updateBook(id: number, book: Partial<Book>): Promise<void> {
    const sql = 'UPDATE Inventory SET title = ?, author = ?, genre = ?, publication_date = ?, isbn = ? WHERE id = ?';
    await pool.query(sql, [book.title, book.author, book.genre, book.publication_date, book.isbn, id]);
  }

  static async deleteBook(id: number): Promise<void> {
    const sql = 'DELETE FROM Inventory WHERE id = ?';
    await pool.query(sql, [id]);
  }
}
