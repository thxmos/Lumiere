const chartData = [
  { date: "2023-06-01", clicks: 120, scans: 80 },
  { date: "2023-06-08", clicks: 150, scans: 100 },
  { date: "2023-06-15", clicks: 180, scans: 130 },
  { date: "2023-06-22", clicks: 220, scans: 160 },
  { date: "2023-06-29", clicks: 250, scans: 190 },
];

const tableData = [
  {
    id: 1,
    date: "2023-06-01",
    type: "Click",
    link: "spotify.com/artist",
    browser: "Chrome",
    os: "Windows",
  },
  {
    id: 2,
    date: "2023-06-02",
    type: "Scan",
    link: "QR Code 1",
    browser: "Safari",
    os: "iOS",
  },
  {
    id: 3,
    date: "2023-06-03",
    type: "Click",
    link: "instagram.com/artist",
    browser: "Firefox",
    os: "macOS",
  },
  {
    id: 4,
    date: "2023-06-04",
    type: "Click",
    link: "twitter.com/artist",
    browser: "Chrome",
    os: "Android",
  },
  {
    id: 5,
    date: "2023-06-05",
    type: "Scan",
    link: "QR Code 2",
    browser: "Edge",
    os: "Windows",
  },
];

export { chartData, tableData };
