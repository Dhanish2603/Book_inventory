import { Request, Response } from 'express';
import { BookService } from '../services/bookService';
import { Book } from '../models/bookModel';

export class BookController {
  static async addBook(req: Request, res: Response): Promise<Response> {
    try {
      const newBook: Book = req.body;
      await BookService.addBook(newBook);
      return res.status(201).json({ message: 'Book added successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add book' });
    }
  }

  static async getBooks(req: Request, res: Response): Promise<Response> {
    try {
      const filters = req.query;
      const books = await BookService.getBooks(filters);
      return res.status(200).json(books);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to retrieve books' });
    }
  }

  static async updateBook(req: Request, res: Response): Promise<Response> {
    try {
      const bookId = parseInt(req.params.id, 10);
      const bookData: Partial<Book> = req.body;
      await BookService.updateBook(bookId, bookData);
      return res.status(200).json({ message: 'Book updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update book' });
    }
  }

  static async deleteBook(req: Request, res: Response): Promise<Response> {
    try {
      const bookId = parseInt(req.params.id, 10);
      await BookService.deleteBook(bookId);
      return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete book' });
    }
  }
}
