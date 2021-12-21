/**
 * GALHARDO APP
 * Created By © Alex Galhardo  | August 2021-Present
 * aleexgvieira@gmail.com
 * https://github.com/AlexGalhardo
 *
 *
 *  http://localhost:3000/api/public
 */

import bodyParser from 'body-parser';

// MODELS
import Blog from '../../models/JSON/Blog';
import Books from '../../models/JSON/Books';
import Games from '../../models/JSON/Games';
import Users from '../../models/JSON/Users';

class APIPublicController {
	static async getPublicEmailRegistred(req, res, next) {
		try {
			const emailRegistred = await Users.emailRegistred(req.params.email);
			return res.json({
				emailRegistred,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicBlog(req, res, next) {
		try {
			const blog = await Blog.getAll();
			return res.json({
				blog,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicBlogPostByID(req, res, next) {
		try {
			const { blog_id } = req.params;
			const blog = await Blog.getByID(blog_id);
			return res.json({
				blog,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicBlogPostRandom(req, res, next) {
		try {
			const totalBlogPosts = await Blog.getTotal();
			const random_blogPost_id =
				(await Math.floor(Math.random() * totalBlogPosts)) + 1;
			const blog = await Blog.getBlogPostByID(random_blogPost_id);
			return res.json({
				blog,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicGames(req, res, next) {
		try {
			const games = await Games.getAll();
			return res.json({
				games,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicGameByID(req, res, next) {
		try {
			const { game_id } = req.params;
			const game = await Games.getByID(game_id);
			return res.json({
				game,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicRandomGame(req, res, next) {
		try {
			const game = await Games.getRandom();
			return res.json({
				game,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicBooks(req, res, next) {
		try {
			const books = await Books.getAll();
			return res.json({
				books,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicBookByID(req, res, next) {
		try {
			const { book_id } = req.params;
			const book = await Books.getByID(book_id);
			return res.json({
				book,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getPublicRandomBook(req, res, next) {
		try {
			const book = await Books.getRandom();
			return res.json({
				book,
			});
		} catch (err) {
			next(err);
		}
	}
}

export default APIPublicController;