import "./globals.css";

export const metadata = {
  title: "Aura Global — Premium Education Consultancy",
  description: "Bespoke admissions strategy for Bachelor's and Master's candidates.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
