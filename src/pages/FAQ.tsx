import React from 'react';
import Layout from '@/components/layout/Layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How do I track my order?', a: 'Go to My Profile > Orders to see your order status and tracking details.' },
  { q: 'What is the return policy?', a: 'We offer 30-day easy returns on all products. Items must be unused with original tags.' },
  { q: 'How long does delivery take?', a: 'Standard delivery takes 5-7 business days. Express delivery is available for select locations.' },
  { q: 'What payment methods do you accept?', a: 'We accept UPI, Credit/Debit cards, Net Banking, and Cash on Delivery.' },
];

const FAQ: React.FC = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible>
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </Layout>
);
export default FAQ;
