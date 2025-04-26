import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveUserToStorage, getUserFromStorage } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const LoginForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) 
        ? '' : 'Unesite validnu email adresu',
      password: formData.password.length >= 6 
        ? '' : 'Lozinka mora imati najmanje 6 karaktera',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error)) {
      setErrorMessage('Molimo unesite ispravnu email adresu i lozinku.');
      setShowErrorDialog(true);
      return false;
    }

    // Demo login check - in real app this would check against backend
    const user = getUserFromStorage();
    if (!user || user.email !== formData.email || user.password !== formData.password) {
      setErrorMessage('Pogrešna email adresa ili lozinka.');
      setShowErrorDialog(true);
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Uspešno prijavljivanje!",
        description: "Dobrodošli nazad u SMARTY aplikaciju.",
      });

      navigate('/chat');
    }
  };

  return (
    <>
      <Card className="w-full glass-morphism">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-smarty-DEFAULT">
            SMARTY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email"name="email"type="email"placeholder="vas@email.com"value={formData.email}onChange={handleChange}className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Lozinka</Label>
              <Input id="password"name="password"type="password"placeholder="Unesite lozinku"value={formData.password}onChange={handleChange}className={errors.password ? "border-red-500" : ""}/>
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            <Button type="submit" className="w-full" variant="default">
              Prijavi se
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Greška pri prijavljivanju</AlertDialogTitle>
            <AlertDialogDescription>
              {errorMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorDialog(false)}>
              U redu
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginForm;
