import Logo from '../svgs/logo';
import styles from './header.module.scss';

export default function Header({ name }: { name: string }) {
  const dataFormatada = new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'America/Sao_Paulo',
  });
  return (
    <header className={styles.header}>
      <Logo />
      <h1 className={styles.header_title}>
        Bem-vindo de volta{name && `, ${name}`}
      </h1>
      <span className={styles.header_date}>
        {dataFormatada.format(new Date()).replace(/às.*/gi, '')}
      </span>
    </header>
  );
}
