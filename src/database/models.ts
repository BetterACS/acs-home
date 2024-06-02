import mongoose, { Document, Schema } from 'mongoose';

// Define User Schema
interface User extends Document {
	email: string;
	password: string;
	display_name: string;
	created_at: Date;
	reset_token?: string;
	reset_token_expire?: Date;
	coin?: number;
	role: string;
	discord_id?: string;
	avatar: string;
}

const UserSchema: Schema<User> = new Schema({
	email: { type: String, required: true },
	password: { type: String, required: true },
	display_name: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	reset_token: { type: String },
	reset_token_expire: { type: Date },
	coin: { type: Number },
	role: { type: String, default: 'User' },
	discord_id: { type: String },
	avatar: { type: String, required: true },
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);

// Define Post Schema
interface Post extends Document {
	title: string;
	description?: string;
	created_at: Date;
	due_date?: Date;
	vote?: number;
	coin_reward?: number;
	type?: string;
	user_id: mongoose.Types.ObjectId;
	githubLink?: string;
}

const PostSchema: Schema<Post> = new Schema({
	title: { type: String, required: true },
	description: { type: String },
	created_at: { type: Date, default: Date.now },
	due_date: { type: Date },
	vote: { type: Number, default: 0 },
	coin_reward: { type: Number, default: 0 },
	type: { type: String, default: 'event_card' },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	githubLink: { type: String },
});

const PostModel = mongoose.models.Post || mongoose.model<Post>('Post', PostSchema);

// Define Tag Schema
interface Tag extends Document {
	tag_name: string;
	created_at: Date;
}

const TagSchema: Schema<Tag> = new Schema({
	tag_name: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
});

const TagModel = mongoose.models.Tag || mongoose.model<Tag>('Tag', TagSchema);

// Define PostTag Schema
interface PostTag extends Document {
	post_id: mongoose.Types.ObjectId;
	tag_id: mongoose.Types.ObjectId;
	created_at: Date;
}

const PostTagSchema: Schema<PostTag> = new Schema({
	post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
	tag_id: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
	created_at: { type: Date, default: Date.now },
});

const PostTagModel = mongoose.models.PostTag || mongoose.model<PostTag>('PostTag', PostTagSchema);

// Define Comment Schema
interface Comment extends Document {
	comment_text: string;
	created_at: Date;
	user_id: mongoose.Types.ObjectId;
	post_id: mongoose.Types.ObjectId;
}

const CommentSchema: Schema<Comment> = new Schema({
	comment_text: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

const CommentModel = mongoose.models.Comment || mongoose.model<Comment>('Comment', CommentSchema);

// Define CommentPhoto Schema
interface CommentPhoto extends Document {
	photo_source: string;
	created_at: Date;
	comment_id: mongoose.Types.ObjectId;
}

const CommentPhotoSchema: Schema<CommentPhoto> = new Schema({
	photo_source: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	comment_id: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
});

const CommentPhotoModel =
	mongoose.models.CommentPhoto || mongoose.model<CommentPhoto>('CommentPhoto', CommentPhotoSchema);

// Define Bookmark Schema
interface Bookmark extends Document {
	created_at: string;
	user_id: mongoose.Types.ObjectId;
	post_id: mongoose.Types.ObjectId;
}

const BookmarkSchema: Schema<Bookmark> = new Schema({
	created_at: { type: String, required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
});

const BookmarkModel = mongoose.models.Bookmark || mongoose.model<Bookmark>('Bookmark', BookmarkSchema);

// Define PostVote Schema
interface PostVote extends Document {
	vote_type: number;
	post_id: mongoose.Types.ObjectId;
	user_id: mongoose.Types.ObjectId;
}

const PostVoteSchema: Schema<PostVote> = new Schema({
	vote_type: { type: Number, required: true },
	post_id: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const PostVoteModel = mongoose.models.PostVote || mongoose.model<PostVote>('PostVote', PostVoteSchema);

// Define Event Schema
interface Event extends Document {
	start_date?: Date;
	end_date?: Date;
	event_text: string;
	user_id: mongoose.Types.ObjectId;
}

const EventSchema: Schema<Event> = new Schema({
	start_date: { type: Date },
	end_date: { type: Date },
	event_text: { type: String, required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const EventModel = mongoose.models.Event || mongoose.model<Event>('Event', EventSchema);

// Define EventPhoto Schema
interface EventPhoto extends Document {
	photo_source: string;
	created_at: Date;
	event_id: mongoose.Types.ObjectId;
}

const EventPhotoSchema: Schema<EventPhoto> = new Schema({
	photo_source: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	event_id: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
});

const EventPhotoModel = mongoose.models.EventPhoto || mongoose.model<EventPhoto>('EventPhoto', EventPhotoSchema);

// Define Item Schema
interface Item extends Document {
	item_name: string;
	price: number;
	quantity: number;
	item_text: string;
}

const ItemSchema: Schema<Item> = new Schema({
	item_name: { type: String, required: true },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	item_text: { type: String, required: true },
});

const ItemModel = mongoose.models.Item || mongoose.model<Item>('Item', ItemSchema);

// Define Redeem Schema
interface Redeem extends Document {
	created_at: Date;
	item_id: mongoose.Types.ObjectId;
	user_id: mongoose.Types.ObjectId;
}

const RedeemSchema: Schema<Redeem> = new Schema({
	created_at: { type: Date, default: Date.now },
	item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

const RedeemModel = mongoose.models.Redeem || mongoose.model<Redeem>('Redeem', RedeemSchema);

// Define ItemPhoto Schema
interface ItemPhoto extends Document {
	photo_source: string;
	created_at: Date;
	item_id: mongoose.Types.ObjectId;
}

const ItemPhotoSchema: Schema<ItemPhoto> = new Schema({
	photo_source: { type: String, required: true },
	created_at: { type: Date, default: Date.now },
	item_id: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
});

const ItemPhotoModel = mongoose.models.ItemPhoto || mongoose.model<ItemPhoto>('ItemPhoto', ItemPhotoSchema);

// Export models
export {
	BookmarkModel,
	CommentModel,
	CommentPhotoModel,
	EventModel,
	EventPhotoModel,
	ItemModel,
	ItemPhotoModel,
	PostModel,
	PostTagModel,
	PostVoteModel,
	RedeemModel,
	TagModel,
	UserModel,
};

export type {
	Bookmark,
	Comment,
	CommentPhoto,
	Event,
	EventPhoto,
	Item,
	ItemPhoto,
	Post,
	PostTag,
	PostVote,
	Redeem,
	Tag,
	User,
};
