import { Navbar } from '@/features/face/components/Navbar';

const FaceLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-screen flex flex-col bg-face-background text-face-foreground font-sans">
      <Navbar />
      <main className="flex-1 container">{children}</main>
    </div>
  );
};

export default FaceLayout;
