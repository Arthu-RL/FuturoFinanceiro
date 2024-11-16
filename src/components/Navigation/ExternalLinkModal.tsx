import { useEffect, useState } from 'react';
import type { ExternalLink } from '@/@types/link';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ExternalLinkModal = {
  link: ExternalLink;
};

export function ExternalLinkModal({ link }: ExternalLinkModal) {
  const [isExternalLinkModalOpen, setIsExternalLinkModalOpen] = useState(false);

  useEffect(() => {
    setIsExternalLinkModalOpen(true);
  }, [link]);

  if (!link) return null;

  return (
    <AlertDialog open={isExternalLinkModalOpen}>
      <AlertDialogContent className='gap-0 max-sm:max-w-[90%]'>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja Prosseguir?</AlertDialogTitle>
          <AlertDialogDescription>
            <em>
              Esse link direciona para a plataforma externa <b className='text-foreground'>{link.title}</b>,
              sugerida como complemento ao aprendizado. O <b className='text-foreground'>Futuro Financeiro</b>{' '}
              não possui vínculo com a empresa nem se responsabiliza pelas informações ou serviços oferecidos.
            </em>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsExternalLinkModalOpen(false)}>Voltar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <a
              onClick={() => setIsExternalLinkModalOpen(false)}
              href={link.href}
              target='_blank'
              rel='noopener'
            >
              Continuar
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
