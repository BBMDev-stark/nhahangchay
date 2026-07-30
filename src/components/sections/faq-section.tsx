"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { SectionTitle } from "@/components/shared/section-title";
import { Container } from "@/components/shared/container";
import { faqItems } from "@/features/faq/data/faq";

export function FaqSection() {
  return (
    <section id="faq" className="section-padding bg-bg-primary">
      <Container className="mx-auto max-w-3xl">
        <SectionTitle
          eyebrow="Hỗ Trợ"
          title="Câu Hỏi Thường Gặp"
          className="mb-14"
        />
        <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
          {faqItems.map((faq) => (
            <Accordion.Item
              key={faq.id}
              value={faq.id}
              className="overflow-hidden rounded-lg border border-border bg-surface-raised"
            >
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between px-6 py-5 text-left font-heading text-lg text-text">
                  {faq.question}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-gold transition-transform duration-300 group-data-[state=open]:rotate-180"
                  />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden px-6 text-sm leading-relaxed text-text/60 data-[state=open]:pb-5 data-[state=open]:animate-[accordionDown_0.3s_ease-out] data-[state=closed]:animate-[accordionUp_0.3s_ease-out]">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Container>
    </section>
  );
}
