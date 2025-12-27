import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Users, Package, DollarSign, ShoppingBag, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/services/api';

const Dashboard: React.FC = () => {
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0, totalProducts: 0 });

  useEffect(() => {
    if (!isAdmin) { navigate('/admin/login'); return; }
    api.getAdminStats().then(setStats);
  }, [isAdmin, navigate]);

  const handleLogout = () => { logout(); navigate('/'); };

  const cards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500' },
    { title: 'Total Orders', value: stats.totalOrders, icon: ShoppingBag, color: 'text-green-500' },
    { title: 'Revenue', value: `₹${stats.totalRevenue}`, icon: DollarSign, color: 'text-yellow-500' },
    { title: 'Products', value: stats.totalProducts, icon: Package, color: 'text-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">ShopStyle Admin</h1>
        <div className="flex gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">View Store</Link>
          <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
        </div>
      </header>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {cards.map((c) => (
            <Card key={c.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </CardHeader>
              <CardContent><p className="text-2xl font-bold">{c.value}</p></CardContent>
            </Card>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Link to="/admin/products" className="p-4 bg-card rounded-lg border hover:border-primary"><Package className="h-6 w-6 mb-2" /><span className="font-medium">Manage Products</span></Link>
          <Link to="/admin/orders" className="p-4 bg-card rounded-lg border hover:border-primary"><ShoppingBag className="h-6 w-6 mb-2" /><span className="font-medium">Manage Orders</span></Link>
          <Link to="/admin/users" className="p-4 bg-card rounded-lg border hover:border-primary"><Users className="h-6 w-6 mb-2" /><span className="font-medium">Manage Users</span></Link>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
