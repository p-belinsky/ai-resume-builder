import Image from "next/image";

type IconName =
  | "home"
  | "compass"
  | "message"
  | "bell"
  | "bookmark"
  | "plus"
  | "search"
  | "heart"
  | "comment"
  | "send"
  | "more"
  | "sparkle";

function Icon({ name, className }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: (
      <>
        <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8z" />
      </>
    ),
    message: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.8-.9L4 20l1.6-4.1a7.5 7.5 0 1 1 14.4-4.4Z" />
        <path d="M8.5 11.5h7" />
      </>
    ),
    bell: (
      <>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    bookmark: <path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-4-6 4z" />,
    plus: (
      <>
        <path d="M12 5v14M5 12h14" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4 4" />
      </>
    ),
    heart: <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.6 4.6 0 0 1 8.8-1.7 4.6 4.6 0 0 1 8.8 1.7Z" />,
    comment: <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.8-.9L4 20l1.6-4.1a7.5 7.5 0 1 1 14.4-4.4Z" />,
    send: <path d="m21 3-7.2 18-3.4-7.4L3 10.2 21 3Zm0 0L10.4 13.6" />,
    more: (
      <>
        <circle cx="5" cy="12" r="1" />
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
      </>
    ),
    sparkle: (
      <>
        <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
        <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

const stories = [
  { name: "Amelia", image: "/images/avatar-amelia.jpg", isNew: true },
  { name: "James", image: "/images/avatar-james.jpg", isNew: true },
  { name: "Luna", image: "/images/avatar-luna.jpg", isNew: true },
  { name: "Mateo", image: "/images/avatar-mateo.jpg", isNew: false },
];

const posts = [
  {
    username: "amelia.rose",
    name: "Amelia Rose",
    location: "Lago di Braies, Italy",
    image: "/images/post-coast.jpg",
    imageAlt: "A quiet mountain lake beneath dramatic peaks at sunrise",
    caption: "Took the long way and found a little bit of magic. ✨",
    likes: "2,481",
    comments: "38",
    time: "2 hours ago",
  },
  {
    username: "james.wanders",
    name: "James Carter",
    location: "Somewhere in the desert",
    image: "/images/post-desert.jpg",
    imageAlt: "A wide open landscape in warm late-afternoon light",
    caption: "Collecting places that make you feel small, in the best way.",
    likes: "1,204",
    comments: "16",
    time: "5 hours ago",
  },
];

const navigation: { name: string; href: string; icon: IconName }[] = [
  { name: "Home", href: "#feed", icon: "home" },
  { name: "Explore", href: "#explore", icon: "compass" },
  { name: "Messages", href: "#friends", icon: "message" },
  { name: "Notifications", href: "#notifications", icon: "bell" },
  { name: "Saved", href: "#saved", icon: "bookmark" },
];

export default function Home() {
  return (
    <div className="app-shell" id="feed">
      <aside className="sidebar">
        <a className="brand" href="#feed" aria-label="muse home">
          <span className="brand-mark">
            <Icon name="sparkle" />
          </span>
          <span className="brand-word">muse<span>.</span></span>
        </a>

        <a className="create-link" href="#share">
          <Icon name="plus" />
          <span className="create-label">Create post</span>
        </a>

        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              className={`nav-link${item.name === "Home" ? " active" : ""}`}
              href={item.href}
              key={item.name}
              aria-current={item.name === "Home" ? "page" : undefined}
            >
              <span className="nav-icon-wrap">
                <Icon name={item.icon} />
                {item.name === "Notifications" && <span className="nav-dot" />}
              </span>
              <span className="nav-label">{item.name}</span>
              {item.name === "Messages" && <span className="nav-badge">3</span>}
            </a>
          ))}
        </nav>

        <div className="sidebar-prompt">
          <span className="prompt-icon"><Icon name="sparkle" /></span>
          <p>Your little corner of the internet.</p>
          <a href="#explore">Find your people <span aria-hidden="true">↗</span></a>
        </div>

        <a className="sidebar-profile" href="#profile">
          <span className="avatar avatar-small">
            <Image src="/images/avatar-you.jpg" alt="Alex Morgan" fill sizes="40px" />
          </span>
          <span className="sidebar-profile-copy">
            <span className="sidebar-profile-name">Alex Morgan</span>
            <span className="sidebar-profile-meta">@alexmorgan</span>
          </span>
          <Icon name="more" className="profile-more" />
        </a>
      </aside>

      <header className="mobile-header">
        <a className="brand" href="#feed" aria-label="muse home">
          <span className="brand-mark"><Icon name="sparkle" /></span>
          <span className="brand-word">muse<span>.</span></span>
        </a>
        <div className="mobile-header-actions">
          <a href="#explore" aria-label="Explore"><Icon name="search" /></a>
          <a href="#notifications" aria-label="Notifications"><Icon name="bell" /></a>
        </div>
      </header>

      <main className="content-area">
        <div className="content-heading">
          <div>
            <p className="eyebrow">MONDAY, MAY 20, 2024</p>
            <h1>A little inspiration <span>for your day.</span></h1>
          </div>
          <div className="heading-actions">
            <a className="icon-link search-link" href="#explore" aria-label="Explore posts">
              <Icon name="search" />
            </a>
            <a className="icon-link notification-link" href="#notifications" aria-label="Notifications">
              <Icon name="bell" />
              <span className="notification-dot" />
            </a>
            <a className="avatar avatar-heading" href="#profile" aria-label="Your profile">
              <Image src="/images/avatar-you.jpg" alt="Alex Morgan" fill sizes="44px" />
            </a>
          </div>
        </div>

        <div className="workspace">
          <div className="feed-column">
            <section className="stories-section" aria-labelledby="stories-title">
              <div className="section-heading">
                <div>
                  <h2 id="stories-title">Stories</h2>
                  <p>A little peek at everyone’s day</p>
                </div>
                <a className="text-link" href="#friends">See all <span aria-hidden="true">→</span></a>
              </div>
              <div className="stories-list">
                <a className="story" href="#share">
                  <span className="story-ring own-story">
                    <span className="avatar story-avatar">
                      <Image src="/images/avatar-you.jpg" alt="" fill sizes="66px" />
                    </span>
                    <span className="story-add"><Icon name="plus" /></span>
                  </span>
                  <span className="story-name">Your story</span>
                </a>
                {stories.map((story) => (
                  <a className="story" href="#friends" key={story.name}>
                    <span className={`story-ring${story.isNew ? " story-unseen" : ""}`}>
                      <span className="avatar story-avatar">
                        <Image src={story.image} alt={`${story.name}'s profile`} fill sizes="66px" />
                      </span>
                    </span>
                    <span className="story-name">{story.name}</span>
                  </a>
                ))}
              </div>
            </section>

            <a className="share-prompt" href="#share" id="share">
              <span className="avatar share-avatar">
                <Image src="/images/avatar-you.jpg" alt="" fill sizes="44px" />
              </span>
              <span className="share-copy">Share a little moment...</span>
              <span className="share-action"><Icon name="plus" /> <span>Post</span></span>
            </a>

            <div className="feed-toolbar" id="explore">
              <div>
                <h2>Your feed</h2>
                <p>Fresh moments from your circle</p>
              </div>
              <a className="feed-filter" href="#friends">Following <span aria-hidden="true">⌄</span></a>
            </div>

            <div className="post-list">
              {posts.map((post, index) => (
                <article className="post-card" key={post.username}>
                  <header className="post-header">
                    <a className="post-user" href="#profile">
                      <span className={`avatar post-avatar${index === 0 ? " avatar-ring" : ""}`}>
                        <Image
                          src={index === 0 ? "/images/avatar-amelia.jpg" : "/images/avatar-james.jpg"}
                          alt={`${post.name}'s profile`}
                          fill
                          sizes="46px"
                        />
                      </span>
                      <span className="post-user-copy">
                        <span className="post-username">{post.username}</span>
                        <span className="post-location">{post.location}</span>
                      </span>
                    </a>
                    <a className="post-more" href="#friends" aria-label={`More from ${post.name}`}>
                      <Icon name="more" />
                    </a>
                  </header>

                  <div className="post-photo">
                    <Image
                      src={post.image}
                      alt={post.imageAlt}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 700px, 680px"
                      priority={index === 0}
                    />
                    <span className="photo-note"><Icon name="sparkle" /> little moments, big feelings</span>
                  </div>

                  <div className="post-content">
                    <div className="post-actions" aria-label="Post details">
                      <div className="post-action-group">
                        <span className="post-action"><Icon name="heart" /><span className="sr-only">Likes</span></span>
                        <span className="post-action"><Icon name="comment" /><span className="sr-only">Comments</span></span>
                        <span className="post-action"><Icon name="send" /><span className="sr-only">Share</span></span>
                      </div>
                      <span className="post-action" id={index === 0 ? "saved" : undefined}>
                        <Icon name="bookmark" /><span className="sr-only">Save</span>
                      </span>
                    </div>
                    <p className="post-likes">{post.likes} <span>people found a little joy here</span></p>
                    <p className="post-caption"><a href="#profile">{post.username}</a> {post.caption}</p>
                    <a className="comments-link" href="#friends">View all {post.comments} comments</a>
                    <time className="post-time">{post.time}</time>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="right-column" aria-label="Your circle and inspiration">
            <section className="profile-card" id="profile">
              <span className="avatar profile-card-avatar">
                <Image src="/images/avatar-you.jpg" alt="Alex Morgan" fill sizes="58px" />
              </span>
              <div className="profile-card-copy">
                <strong>Alex Morgan</strong>
                <span>@alexmorgan</span>
              </div>
              <a href="#feed" className="text-link">View profile</a>
            </section>

            <section className="suggestions-card" id="friends">
              <div className="aside-heading">
                <h2>Your circle</h2>
                <a className="text-link" href="#explore">See all</a>
              </div>
              <p className="aside-subtitle">People you might like</p>
              <div className="suggestion-list">
                <a className="suggestion" href="#profile">
                  <span className="avatar suggestion-avatar"><Image src="/images/avatar-luna.jpg" alt="" fill sizes="42px" /></span>
                  <span className="suggestion-copy"><strong>luna.studio</strong><span>Followed by Amelia</span></span>
                  <span className="follow-link">Follow</span>
                </a>
                <a className="suggestion" href="#profile">
                  <span className="avatar suggestion-avatar"><Image src="/images/avatar-mateo.jpg" alt="" fill sizes="42px" /></span>
                  <span className="suggestion-copy"><strong>mateo.jpg</strong><span>New to muse</span></span>
                  <span className="follow-link">Follow</span>
                </a>
                <a className="suggestion" href="#profile">
                  <span className="avatar suggestion-avatar"><Image src="/images/avatar-james.jpg" alt="" fill sizes="42px" /></span>
                  <span className="suggestion-copy"><strong>james.wanders</strong><span>Followed by 3 friends</span></span>
                  <span className="follow-link">Follow</span>
                </a>
              </div>
            </section>

            <section className="notification-card" id="notifications">
              <span className="notification-icon"><Icon name="heart" /></span>
              <div><p><strong>Amelia</strong> and <strong>12 others</strong> liked your latest photo.</p><span>Just now · Your activity</span></div>
            </section>

            <section className="inspiration-card" aria-label="A little inspiration">
              <div className="inspiration-image">
                <Image src="/images/post-desert.jpg" alt="Sunlit hills under a wide open sky" fill sizes="270px" />
                <span>THIS WEEK’S MOOD</span>
              </div>
              <div className="inspiration-copy">
                <span className="inspiration-kicker"><Icon name="sparkle" /> A little inspiration</span>
                <h2>Make room for the unexpected.</h2>
                <a href="#explore">Explore moments <span aria-hidden="true">↗</span></a>
              </div>
            </section>

            <footer className="sidebar-footer">
              <a href="#feed">About</a><a href="#feed">Guidelines</a><a href="#feed">Privacy</a><span>© 2024 MUSE</span>
            </footer>
          </aside>
        </div>
      </main>
    </div>
  );
}
