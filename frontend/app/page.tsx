"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

function UpdateComponent() {
	const [input, setInput] = useState("");
	const [response, setResponse] = useState("");

	const handleUpdate = async () => {
		setResponse("Sending...");
		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/update`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ value: input })
			});
			const data = await res.json();
			// data.data may be an object; stringify safely
			const payload = typeof data.data === 'object' ? JSON.stringify(data.data) : String(data.data);
			setResponse(`${data.message}: ${payload}`);
		} catch (_err) {
			setResponse("Error sending update");
		}
	};

	return (
		<div className="p-4 border rounded bg-gray-50 dark:bg-gray-900 text-center mb-4">
			<input
				type="text"
				value={input}
				onChange={e => setInput(e.target.value)}
				className="border px-2 py-1 rounded mr-2"
				placeholder="Type something to update"
			/>
			<button
				onClick={handleUpdate}
				className="bg-blue-500 text-white px-3 py-1 rounded"
			>
				Send Update
			</button>
			<div className="mt-2 text-sm">{response}</div>
		</div>
	);
}

export default function Home() {
	const [backendMessage, setBackendMessage] = useState<string>("");

	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hello`)
			.then((res) => res.json())
			.then((data) => setBackendMessage(data.message))
			.catch(() => setBackendMessage("Could not connect to backend."));
	}, []);

	return (
		<div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt="Next.js logo"
					width={180}
					height={38}
					priority
				/>
				<ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
					<li className="mb-2 tracking-[-.01em]">
						Get started by editing{" "}
						<code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
							app/page.tsx
						</code>
						.
					</li>
					<li className="tracking-[-.01em]">
						Save and see your changes instantly.
					</li>
				</ol>
				<UpdateComponent />
				{/* Backend connection demo */}
				<div className="p-4 border rounded bg-gray-50 dark:bg-gray-900 text-center mb-4">
					<strong>Backend says:</strong> {backendMessage}
				</div>
				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
						href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							className="dark:invert"
							src="/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						Deploy now
					</a>
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
						href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Read our docs
					</a>
				</div>
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt="File icon"
						width={16}
						height={16}
					/>
					Learn
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt="Window icon"
						width={16}
						height={16}
					/>
					Examples
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt="Globe icon"
						width={16}
						height={16}
					/>
					Go to nextjs.org →
				</a>
			</footer>
		</div>
	);
}


