import { useState, useRef, useEffect } from 'react';
import postsData from '../../data/posts.json';

function Blog() {
  const containerStyle: React.CSSProperties = { maxWidth: "1200px", margin: "0 auto", padding: "0 16px" };

  const blogPosts = postsData;
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);

  const iconWrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  };

  const iconButtonStyle: React.CSSProperties = {
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: "pointer",
    color: "#6B7280",
  };

  const Icon = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
    <button style={iconButtonStyle} onClick={onClick}>
      {children}
    </button>
  );

  const BlogIcons = () => (
    <div style={iconWrapperStyle}>
      <Icon onClick={() => setIsSearchOpen(!isSearchOpen)}>
        <svg
          width={22}
          height={22}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </Icon>
      <Icon onClick={() => setIsNotificationOpen(!isNotificationOpen)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={22} height={22}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
        </svg>
      </Icon>
      <Icon onClick={() => setIsStatsOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={22} height={22}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.543L7.5 20.25M12 12v9.75m-4.5-9.75L3.75 20.25M20.25 7.5L16.5 3.75M12 12V3.75m4.5 8.25L20.25 3.75" />
        </svg>
      </Icon>
    </div>
  );

  const [selectedTag, setSelectedTag] = useState<string>("HOME");

  const allTags = ["HOME", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filteredPosts = selectedTag === "HOME"
    ? blogPosts.filter((p) =>
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blogPosts.filter((p) =>
        p.category === selectedTag &&
        (searchQuery === '' ||
         p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

  const TabBar = ({ tags, selectedTag, onSelectTag }: { tags: string[], selectedTag: string, onSelectTag: (tag: string) => void }) => {
    const tabContainerRef = useRef<HTMLDivElement>(null);

    const tabContainerStyle: React.CSSProperties = {
      position: "sticky",
      top: 0,
      background: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(8px)",
      zIndex: 10,
      borderBottom: "1px solid #e5e7eb",
    };

    const tabListStyle: React.CSSProperties = {
      display: "flex",
      gap: "8px",
      padding: "12px 24px",
      overflowX: "auto",
      // Hide scrollbar
      scrollbarWidth: "none", // Firefox
      msOverflowStyle: "none",  // IE and Edge
    };

    const tabButtonStyle: React.CSSProperties = {
      padding: "8px 16px",
      borderRadius: "8px",
      background: "transparent",
      border: "none",
      color: "#6B7280",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease",
      whiteSpace: "nowrap",
    };

    const selectedTabButtonStyle: React.CSSProperties = {
      ...tabButtonStyle,
      background: "#111827",
      color: "#ffffff",
    };

    return (
      <div style={tabContainerStyle} ref={tabContainerRef}>
        <div style={{...containerStyle, padding: 0}}>
          <div style={tabListStyle}>
            {tags.map((tag) => (
              <button
                key={tag}
                style={selectedTag === tag ? selectedTabButtonStyle : tabButtonStyle}
                onClick={() => onSelectTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const floatingButtonStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "32px",
    right: "32px",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 1000,
  };

  const handleWriteClick = () => {
    window.location.href = '/blog/write';
  };

  const SearchBar = () => {
    const [inputValue, setInputValue] = useState(searchQuery);
    const isComposingRef = useRef(false);

    if (!isSearchOpen) return null;

    const handleCompositionStart = () => {
      isComposingRef.current = true;
    };

    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false;
      const value = e.currentTarget.value;
      setInputValue(value);
      setSearchQuery(value);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      if (!isComposingRef.current) {
        setSearchQuery(value);
      }
    };

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}>
        <div style={{ ...containerStyle, maxWidth: '800px' }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="#6B7280" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="게시물 검색..."
                value={inputValue}
                onChange={handleChange}
                onCompositionStart={handleCompositionStart}
                onCompositionEnd={handleCompositionEnd}
                autoFocus
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '16px',
                  color: '#111827',
                }}
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '4px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={20} height={20}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  type Notification = {
    id: number;
    type: 'comment' | 'like' | 'follow';
    message: string;
    time: string;
    read: boolean;
  };

  const NotificationPanel = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
      { id: 1, type: 'comment', message: '새로운 댓글이 달렸습니다: "정말 유익한 글이네요!"', time: '방금 전', read: false },
      { id: 2, type: 'like', message: '게시물에 좋아요 5개가 추가되었습니다', time: '5분 전', read: false },
      { id: 3, type: 'follow', message: 'johndoe님이 팔로우하기 시작했습니다', time: '1시간 전', read: true },
      { id: 4, type: 'comment', message: '새로운 댓글: "공감되는 내용이 많아요"', time: '2시간 전', read: true },
      { id: 5, type: 'like', message: '게시물에 좋아요 3개가 추가되었습니다', time: '3시간 전', read: true },
    ]);
    const [page, setPage] = useState(1);
    const notificationRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!isNotificationOpen) return;

      const handleScroll = () => {
        if (!notificationRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = notificationRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 10) {
          const newNotifications: Notification[] = Array.from({ length: 5 }, (_, i) => ({
            id: notifications.length + i + 1,
            type: ['comment', 'like', 'follow'][Math.floor(Math.random() * 3)] as 'comment' | 'like' | 'follow',
            message: `알림 메시지 ${notifications.length + i + 1}`,
            time: `${page + 1}시간 전`,
            read: true,
          }));
          setNotifications([...notifications, ...newNotifications]);
          setPage(page + 1);
        }
      };

      notificationRef.current?.addEventListener('scroll', handleScroll);
      return () => notificationRef.current?.removeEventListener('scroll', handleScroll);
    }, [notifications, page, isNotificationOpen]);

    if (!isNotificationOpen) return null;

    const getIcon = (type: string) => {
      switch (type) {
        case 'comment':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20} height={20}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          );
        case 'like':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20} height={20}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          );
        case 'follow':
          return (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width={20} height={20}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
          }}
          onClick={() => setIsNotificationOpen(false)}
        />
        <div
          ref={notificationRef}
          style={{
            position: 'fixed',
            top: '60px',
            right: '20px',
            width: '400px',
            maxHeight: '600px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            zIndex: 101,
            overflowY: 'auto',
          }}
        >
          <div style={{
            position: 'sticky',
            top: 0,
            background: '#fff',
            padding: '16px 20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 1,
          }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>알림</h3>
            <button
              onClick={() => setIsNotificationOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280',
                padding: '4px',
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={20} height={20}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #F3F4F6',
                  background: notification.read ? '#fff' : '#F9FAFB',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = '#F3F4F6';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = notification.read ? '#fff' : '#F9FAFB';
                }}
              >
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ color: '#667eea', flexShrink: 0 }}>
                    {getIcon(notification.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#111827', lineHeight: 1.5 }}>
                      {notification.message}
                    </p>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>{notification.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  const StatsModal = () => {
    if (!isStatsOpen) return null;

    const stats = [
      { label: '총 방문자', value: '12,345', change: '+12.5%', trend: 'up' },
      { label: '오늘 방문자', value: '1,234', change: '+8.3%', trend: 'up' },
      { label: '게시물 조회수', value: '45,678', change: '+15.2%', trend: 'up' },
      { label: '평균 체류 시간', value: '3분 45초', change: '-2.1%', trend: 'down' },
    ];

    const trafficSources = [
      { source: '검색 엔진', percentage: 45, color: '#667eea' },
      { source: '소셜 미디어', percentage: 30, color: '#764ba2' },
      { source: '직접 방문', percentage: 15, color: '#f093fb' },
      { source: '기타', percentage: 10, color: '#4facfe' },
    ];

    return (
      <>
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsStatsOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '800px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              padding: '24px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 700 }}>블로그 통계</h2>
              <button
                onClick={() => setIsStatsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '4px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width={24} height={24}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      padding: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '12px',
                      color: '#fff',
                    }}
                  >
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '8px' }}>{stat.label}</div>
                    <div style={{ fontSize: '28px', fontWeight: 700, marginBottom: '4px' }}>{stat.value}</div>
                    <div style={{
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: stat.trend === 'up' ? '#a7f3d0' : '#fca5a5',
                    }}>
                      {stat.trend === 'up' ? '↑' : '↓'} {stat.change}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px' }}>유입 경로</h3>
                {trafficSources.map((source) => (
                  <div key={source.source} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', color: '#111827' }}>{source.source}</span>
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>{source.percentage}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#F3F4F6',
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${source.percentage}%`,
                        height: '100%',
                        background: source.color,
                        transition: 'width 0.3s ease',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '32px', padding: '16px', background: '#F9FAFB', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px' }}>인기 게시물 Top 3</h3>
                {blogPosts.slice(0, 3).map((post, index) => (
                  <div key={post.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: index < 2 ? '1px solid #E5E7EB' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        color: index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : '#d97706',
                      }}>
                        {index + 1}
                      </span>
                      <span style={{ fontSize: '14px', color: '#111827' }}>{post.title}</span>
                    </div>
                    <span style={{ fontSize: '14px', color: '#6B7280' }}>
                      {Math.floor(Math.random() * 5000) + 1000} 조회
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", color: "#111827", minHeight: "100vh", background: "#fff", scrollbarGutter: "stable" }}>
      <SearchBar />
      <NotificationPanel />
      <StatsModal />

      {/* Top Bar */}
      <div style={{ borderBottom: "1px solid #E5E7EB", background: "#fff" }}>
        <div style={{ ...containerStyle, display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
            <img src="/VOIDDOT.svg" alt="VOID." width={36} height={36} style={{ borderRadius: 6 }} />
            <span style={{ color: "#111827", fontWeight: 800, fontSize: 22 }}>VOID.</span>
          </a>
          <BlogIcons />
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", padding: "60px 24px" }}>
        <div style={{ ...containerStyle, textAlign: "center" }}>
          <h1 style={{ fontSize: "2.5rem", margin: "0 0 16px", fontWeight: 800 }}>VOID. 블로그</h1>
          <p style={{ fontSize: 18, margin: 0, opacity: 0.9 }}>패션, 라이프스타일, 트렌드에 대한 이야기</p>
        </div>
      </section>

      <TabBar tags={allTags} selectedTag={selectedTag} onSelectTag={setSelectedTag} />

      {/* Blog Posts */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ ...containerStyle }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Floating Write Button */}
      <button
        style={floatingButtonStyle}
        onClick={handleWriteClick}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1) rotate(90deg)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(102, 126, 234, 0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) rotate(0deg)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.4)";
        }}
        aria-label="글쓰기"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="white"
          width={28}
          height={28}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </div>
  );
}

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
};

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      overflow: "hidden",
      border: "1px solid #E5E7EB",
      transition: "all 0.2s ease",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.1)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
    }}
    >
      <div style={{ height: 200, background: post.image }} />
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <span style={{ background: "#EEF2FF", color: "#4338CA", padding: "4px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>{post.category}</span>
          <span style={{ color: "#6B7280", fontSize: 12 }}>{post.readTime}</span>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#111827", fontWeight: 700 }}>{post.title}</h3>
        <p style={{ margin: "0 0 16px", color: "#6B7280", fontSize: 14, lineHeight: 1.5 }}>{post.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "#6B7280", fontSize: 12 }}>{post.author}</span>
          <span style={{ color: "#6B7280", fontSize: 12 }}>{post.date}</span>
        </div>
      </div>
    </div>
  );
}

export default Blog;