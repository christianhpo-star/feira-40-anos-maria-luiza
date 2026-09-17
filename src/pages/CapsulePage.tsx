import { PageHeader } from '../components/PageHeader'

export function CapsulePage() {
  return (
    <main id="conteudo" className="page">
      <PageHeader title="Cápsula do Tempo" subtitle="Uma pergunta para os próximos 40 anos" backTo="/passaporte" />
      <section className="capsule-card">
        <span className="capsule-card__year">2066</span>
        <h2>Como você imagina nossa escola daqui a 40 anos?</h2>
        <p>Esta área está preparada conceitualmente, mas o envio público de mensagens permanecerá desativado até a escola definir moderação e privacidade.</p>
      </section>
      <section className="notice notice--soft">
        <strong>Próxima etapa sugerida</strong>
        <p>Ativar um formulário moderado, sem exigir cadastro dos visitantes, e revisar as mensagens antes de qualquer exibição pública.</p>
      </section>
    </main>
  )
}
