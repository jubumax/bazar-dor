import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
        lang="bn"
        className="h-full antialiased"
    >
        <body>

            {children}

        </body>
    </html>
);
}
