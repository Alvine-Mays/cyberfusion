import { useEffect } from "react";

// Intégration de chat retirée à la demande du client
export default function ChatProvider() {
  useEffect(() => {
    const crispId = import.meta.env.VITE_CRISP_WEBSITE_ID as string | undefined;
    const tawkId = import.meta.env.VITE_TAWK_PROPERTY_ID as string | undefined;
    const tawkKey = import.meta.env.VITE_TAWK_WIDGET_KEY as string | undefined;

    if (false && crispId) {
      (window as any).$crisp = [];
      (window as any).CRISP_WEBSITE_ID = crispId;
      const d = document; const s = d.createElement("script"); s.src = "https://client.crisp.chat/l.js"; s.async = true; d.getElementsByTagName("head")[0].appendChild(s);
      return;
    }
    if (false && tawkId && tawkKey) {
      const s1 = document.createElement("script"); s1.async = true; s1.src = `https://embed.tawk.to/${tawkId}/${tawkKey}`; s1.charset = "UTF-8"; s1.setAttribute("crossorigin", "*");
      document.body.appendChild(s1);
    }
  }, []);
  return null;
}
