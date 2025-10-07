import type { RequestHandler } from "express";

// Proxy sécurisé pour CountAPI afin d'éviter CORS en production
const NAMESPACE = "cyberfusion.group";

export const handleVisitsHit: RequestHandler = async (req, res) => {
  const key = (req.query.key as string) || "homepage";
  try {
    const r = await fetch(`https://api.countapi.xyz/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(key)}`);
    if (!r.ok) throw new Error("countapi failed");
    const json = await r.json();
    res.json(json);
  } catch (e) {
    res.status(200).json({ value: null });
  }
};

export const handleVisitsGet: RequestHandler = async (req, res) => {
  const key = (req.query.key as string) || "homepage";
  try {
    const r = await fetch(`https://api.countapi.xyz/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(key)}`);
    if (!r.ok) throw new Error("countapi failed");
    const json = await r.json();
    res.json(json);
  } catch (e) {
    res.status(200).json({ value: null });
  }
};
