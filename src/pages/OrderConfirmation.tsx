import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { IconCircleCheck, IconPackage } from '@tabler/icons-react';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (!error && data) {
        setOrder(data);
      }
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-lg">Order not found</p>
          <Button onClick={() => navigate('/marketplace')} className="mt-4">
            Go to Marketplace
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
            <IconCircleCheck className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">{t('thankYouForOrder')}</h1>
          <p className="text-gray-600 mb-8">Your order has been placed successfully</p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <IconPackage className="h-5 w-5 text-samhita-gold" />
              <h2 className="text-xl font-semibold">{t('orderSummary')}</h2>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('orderNumber')}:</span>
                <span className="font-mono">{order.id.slice(0, 8).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('total')}:</span>
                <span className="font-semibold">₹{order.total_amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="capitalize">{order.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('estimatedDelivery')}:</span>
                <span>5-7 business days</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button onClick={() => navigate('/marketplace')} className="w-full">
              {t('continueShopping')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard')} className="w-full">
              View My Orders
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
