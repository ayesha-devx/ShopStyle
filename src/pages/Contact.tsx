import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div>
          <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex gap-3"><Mail className="h-5 w-5" /><span>support@shopstyle.com</span></div>
            <div className="flex gap-3"><Phone className="h-5 w-5" /><span>1800-123-4567</span></div>
            <div className="flex gap-3"><MapPin className="h-5 w-5" /><span>Mumbai, Maharashtra, India</span></div>
          </div>
        </div>
        <form className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" type="email" />
          <Textarea placeholder="Your Message" rows={4} />
          <Button className="w-full">Send Message</Button>
        </form>
      </div>
    </div>
  </Layout>
);
export default Contact;
