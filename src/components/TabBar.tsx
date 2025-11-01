interface TabBarProps {
  active: string;
  onChange: (value: string) => void;
}

export default function TabBar({ active, onChange }: TabBarProps) {
  const tabs = [
    { key: "now_playing", label: "Now Playing" },
    { key: "top_rated", label: "Top Rated" },
  ];

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          className={active === tab.key ? "active" : ""}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
