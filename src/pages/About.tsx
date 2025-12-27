import React from 'react';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">About ShopStyle</h1>
      <p className="text-muted-foreground mb-4">ShopStyle is your one-stop destination for trendy fashion at unbeatable prices. We bring you the latest styles from top brands, making fashion accessible to everyone.</p>
      <p className="text-muted-foreground mb-4">Founded with a passion for fashion and technology, we've grown to serve millions of customers across India.</p>
      <h2 className="text-xl font-semibold mt-8 mb-4">Our Mission</h2>
      <p className="text-muted-foreground">To democratize fashion by providing quality clothing and accessories at affordable prices, with an exceptional shopping experience.</p>
    </div>
  </Layout>
);
export default About;
