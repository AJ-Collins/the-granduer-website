import { BookViewingLink } from "../shell/book-viewing-link";
import { ProposalLink } from "../shell/proposal-link";

export function FinalCTA() {
  return (
    <section className="w-full bg-[#1c2c3c] px-6 py-20 sm:py-28 md:py-32 text-center text-white">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-normal tracking-tight text-white">
          Your extraordinary event starts here
        </h2>

        <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <BookViewingLink className="w-full sm:w-auto min-w-[175px] rounded-lg bg-[#d1d6dc] px-8 py-3.5 font-sans text-xs font-semibold tracking-wider text-[#1c2c3c] shadow-sm transition-colors duration-300 hover:bg-white text-center">
            Book a Viewing
          </BookViewingLink>

          <ProposalLink className="w-full sm:w-auto min-w-[175px] rounded-lg bg-[#d1d6dc] px-8 py-3.5 font-sans text-xs font-semibold tracking-wider text-[#1c2c3c] shadow-sm transition-colors duration-300 hover:bg-white text-center">
            Request a Proposal
          </ProposalLink>
        </div>
      </div>
    </section>
  );
}