export default function AutheLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<main className="">{children}</main>
		</>
	);
}
