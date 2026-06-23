import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Controlla se l'utente sta cercando di accedere alla pagina /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Accesso negato', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic' },
      });
    }

    // Decodifica la password
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    const [user, password] = auth.split(':');

    // Cambia 'admin' e 'pescina2026' con i dati che preferisci
    if (user === 'admin' && password === '2026@') {
      return NextResponse.next();
    }

    return new NextResponse('Credenziali errate', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    });
  }

  return NextResponse.next();
}