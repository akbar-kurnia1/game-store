import { useState } from "react";

const INITIAL_POSTS = [
  {
    id: 1,
    author: "GameMaster99",
    title: "Game free-to-play terbaik 2026?",
    content: "Menurut kalian game free-to-play apa yang paling worth it dimainkan tahun ini? Saya lagi cari game baru buat weekend.",
    likes: 12,
    likedByUser: false,
    timestamp: new Date(2026, 5, 1, 14, 30),
    comments: [
      { id: 1, author: "ProPlayer", text: "Coba Genshin Impact, masih rame!", timestamp: new Date(2026, 5, 1, 15, 0) },
      { id: 2, author: "CasualGamer", text: "Valorant kalau suka FPS.", timestamp: new Date(2026, 5, 1, 16, 20) },
    ],
  },
  {
    id: 2,
    author: "IndieHunter",
    title: "Rekomendasi game indie gratis",
    content: "Banyak game indie bagus yang gratis lho. Kemarin baru main beberapa dan ternyata seru banget. Share dong kalau ada rekomendasi!",
    likes: 8,
    likedByUser: false,
    timestamp: new Date(2026, 5, 2, 10, 0),
    comments: [],
  },
];

export default function Community() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState({ author: "", title: "", content: "" });
  const [showForm, setShowForm] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});
  const [commentAuthor, setCommentAuthor] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.author.trim() || !newPost.title.trim() || !newPost.content.trim()) return;

    const post = {
      id: Date.now(),
      author: newPost.author.trim(),
      title: newPost.title.trim(),
      content: newPost.content.trim(),
      likes: 0,
      likedByUser: false,
      timestamp: new Date(),
      comments: [],
    };

    setPosts([post, ...posts]);
    setNewPost({ author: "", title: "", content: "" });
    setShowForm(false);
  };

  const handleLike = (postId) => {
    setPosts(posts.map((post) => {
      if (post.id !== postId) return post;
      return {
        ...post,
        likedByUser: !post.likedByUser,
        likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
      };
    }));
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text || !commentAuthor.trim()) return;

    const comment = {
      id: Date.now(),
      author: commentAuthor.trim(),
      text: text,
      timestamp: new Date(),
    };

    setPosts(posts.map((post) => {
      if (post.id !== postId) return post;
      return { ...post, comments: [...post.comments, comment] };
    }));

    setCommentInputs({ ...commentInputs, [postId]: "" });
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1) return "baru saja";
    if (diff < 60) return `${diff} menit lalu`;
    if (diff < 1440) return `${Math.floor(diff / 60)} jam lalu`;
    return `${Math.floor(diff / 1440)} hari lalu`;
  };

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fadeInUp">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-store-heading">Community Hub</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary text-sm px-4 py-2"
        >
          {showForm ? "Batal" : "+ Buat Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreatePost} className="bg-store-card border border-store-border rounded-lg p-5 mb-6">
          <h3 className="text-store-heading font-semibold mb-4">Buat Diskusi Baru</h3>
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Nama kamu"
              value={newPost.author}
              onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
              className="bg-store-dark border border-store-border rounded px-3 py-2 text-sm text-store-heading focus:outline-none focus:border-store-accent placeholder-store-text-dim"
            />
            <input
              type="text"
              placeholder="Judul diskusi"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="bg-store-dark border border-store-border rounded px-3 py-2 text-sm text-store-heading focus:outline-none focus:border-store-accent placeholder-store-text-dim"
            />
            <textarea
              placeholder="Tulis isi diskusi..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
              className="bg-store-dark border border-store-border rounded px-3 py-2 text-sm text-store-heading focus:outline-none focus:border-store-accent placeholder-store-text-dim resize-none"
            />
            <button type="submit" className="btn-primary text-sm w-fit">
              Posting
            </button>
          </div>
        </form>
      )}

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-store-card border border-store-border rounded-lg p-5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-store-hover flex items-center justify-center text-xs font-bold text-white">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-store-heading">{post.author}</span>
              <span className="text-xs text-store-text-dim">• {formatTime(post.timestamp)}</span>
            </div>

            <h3 className="text-store-heading font-semibold mb-1">{post.title}</h3>
            <p className="text-store-text text-sm leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center gap-4 text-sm border-t border-store-border pt-3">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 cursor-pointer transition-colors ${
                  post.likedByUser ? "text-store-accent" : "text-store-text-dim hover:text-store-heading"
                }`}
              >
                {post.likedByUser ? "▲" : "△"} {post.likes}
              </button>
              <span className="text-store-text-dim">
                💬 {post.comments.length} komentar
              </span>
            </div>

            {post.comments.length > 0 && (
              <div className="mt-4 pl-4 border-l-2 border-store-border flex flex-col gap-3">
                {post.comments.map((comment) => (
                  <div key={comment.id}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold text-store-heading">{comment.author}</span>
                      <span className="text-xs text-store-text-dim">• {formatTime(comment.timestamp)}</span>
                    </div>
                    <p className="text-sm text-store-text">{comment.text}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2">
              {!commentAuthor && (
                <input
                  type="text"
                  placeholder="Nama kamu (untuk komentar)"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="bg-store-dark border border-store-border rounded px-3 py-1.5 text-xs text-store-heading focus:outline-none placeholder-store-text-dim"
                />
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={commentAuthor ? `Balas sebagai ${commentAuthor}...` : "Tulis komentar..."}
                  value={commentInputs[post.id] || ""}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddComment(post.id);
                  }}
                  className="flex-grow bg-store-dark border border-store-border rounded px-3 py-1.5 text-xs text-store-heading focus:outline-none placeholder-store-text-dim"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="bg-store-card border border-store-border px-3 py-1.5 rounded text-xs text-store-text-dim hover:text-store-heading cursor-pointer"
                >
                  Kirim
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}