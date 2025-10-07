import { useState } from "react";
import { buildWhatsAppURL, DevisPayload, buildMailtoURL } from "@/lib/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Contact & Réseaux — formulaire + WhatsApp + FAQ
export default function Contact() {
  const [data, setData] = useState<DevisPayload>({ nom: "", email: "", telephone: "", typeProjet: "Contact général", budget: "", description: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildWhatsAppURL(data);
    window.open(url, "_blank");
  };

  return (
    <div className="container py-14" id="contact">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Contact & Réseaux</h1>
        <p className="mt-3 text-muted-foreground">Parlez‑nous de votre projet. Réponse rapide assurée.</p>
      </header>

      <form onSubmit={onSubmit} className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nom</label>
          <input required value={data.nom} onChange={(e) => setData({ ...data, nom: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Votre nom" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">E‑mail</label>
          <input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="exemple@mail.com" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Numéro WhatsApp</label>
          <input required value={data.telephone} onChange={(e) => setData({ ...data, telephone: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Ex: 24206xxxxxx" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Sujet</label>
          <input value={data.typeProjet} onChange={(e) => setData({ ...data, typeProjet: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Sujet" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Message</label>
          <textarea required value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2 min-h-[120px]" placeholder="Votre message" />
        </div>
        <div className="md:col-span-2 flex items-center gap-4">
          <button type="submit" className="inline-flex px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold">Envoyer via WhatsApp</button>
          <a
            onClick={(e) => { e.preventDefault(); window.location.href = buildMailtoURL("Contact — CyberFusion Group", [
              `Nom: ${data.nom}`,
              `Email: ${data.email}`,
              `Téléphone: ${data.telephone}`,
              `Sujet: ${data.typeProjet}`,
              `Message: ${data.description}`,
            ]); }}
            href="#"
            className="text-sm text-primary hover:underline"
          >Envoyer par e‑mail</a>
        </div>
      </form>

      <section className="mt-12 max-w-3xl">
        <h2 className="font-heading text-2xl font-bold">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="1">
            <AccordionTrigger>Quels sont vos délais moyens ?</AccordionTrigger>
            <AccordionContent>Selon la complexité : de 2 à 8 semaines pour les projets courants. Un calendrier détaillé est fourni au devis.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionTrigger>Proposez‑vous des paiements échelonnés ?</AccordionTrigger>
            <AccordionContent>Oui, plusieurs options existent selon le type de projet ou de formation.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionTrigger>Offrez‑vous un support après livraison ?</AccordionTrigger>
            <AccordionContent>Nous proposons des contrats de maintenance avec SLA adaptés à vos besoins.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
