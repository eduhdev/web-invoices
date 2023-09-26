import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage = () => (
  <div className='flex items-center justify-center w-full min-h-screen bg-primary'>
    <Card className='max-w-md w-full h-full'>
      <CardHeader className='space-x-1'>
        <CardTitle className='text-2xl'>Log In</CardTitle>
        <CardDescription className=''>
          Welcome to our Web Invoice App
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' placeholder='m@example.com' />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Password</Label>
          <Input id='password' type='password' />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='w-full'>Log In</Button>
      </CardFooter>
    </Card>
  </div>
);

export default LoginPage;
