import { getD1 } from "@/db";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const platforms = new Set(["both", "iphone", "android"]);

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      email?: unknown;
      platform?: unknown;
      company?: unknown;
    };

    if (typeof payload.company === "string" && payload.company.trim()) {
      return Response.json({ status: "joined" }, { status: 201 });
    }

    const email =
      typeof payload.email === "string"
        ? payload.email.trim().toLowerCase()
        : "";
    const platform =
      typeof payload.platform === "string" && platforms.has(payload.platform)
        ? payload.platform
        : "both";

    if (!emailPattern.test(email) || email.length > 254) {
      return Response.json(
        { error: "Enter a valid email address." },
        { status: 400 },
      );
    }

    const db = getD1();
    const result = await db
      .prepare(
        "INSERT OR IGNORE INTO waitlist_entries (id, email, platform) VALUES (?1, ?2, ?3)",
      )
      .bind(crypto.randomUUID(), email, platform)
      .run();

    return Response.json(
      { status: result.meta.changes === 0 ? "already_joined" : "joined" },
      { status: result.meta.changes === 0 ? 200 : 201 },
    );
  } catch (error) {
    console.error("waitlist submission failed", error);
    return Response.json(
      { error: "Early access is temporarily unavailable. Please try again." },
      { status: 503 },
    );
  }
}
