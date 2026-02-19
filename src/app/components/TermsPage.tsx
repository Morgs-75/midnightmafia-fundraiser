import { ArrowLeft } from "lucide-react";

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">

        <a
          href="/"
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8 text-sm"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Board
        </a>

        <h1
          className="text-5xl text-white mb-8"
          style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "1px" }}
        >
          Terms of Service
        </h1>

        <div className="text-gray-300 text-sm space-y-6 leading-relaxed" style={{ fontFamily: "Poppins, sans-serif" }}>
          <p className="font-bold text-white text-base">
            TERMS OF SERVICE – MIDNIGHT MAFIA NUMBERS BOARD FUNDRAISER
          </p>

          <section>
            <h3 className="font-bold text-white mb-1">1. Organiser</h3>
            <p>This fundraiser is organised by Troy Morgan (the Organiser) for the sole benefit of the cheerleading team known as Midnight Mafia (of Outlaws) (the Team).</p>
            <p className="mt-2">Participation in this fundraiser is limited to Team members (Members) who are participating in the international cheerleading competition known as The Cheerleading Worlds, to be held in Orlando, Florida, between 24–27 April 2026.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">2. Purpose of Fundraiser</h3>
            <p>The fundraiser exists solely to support Members attending The Cheerleading Worlds in April 2026.</p>
            <p className="mt-2">100% of proceeds, after payment of the cash prize, belong to the Members.</p>
            <p className="mt-2">No other person or entity will receive any proceeds from the fundraiser.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">3. Fundraiser Structure</h3>
            <p>The fundraiser operates as a numbers board.</p>
            <p className="mt-2 font-semibold text-gray-200">Entry pricing:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>$25 AUD per number, or</li>
              <li>5 numbers for $100 AUD.</li>
            </ul>
            <p className="mt-2">One prize of $500 AUD will be paid to a single winner.</p>
            <p className="mt-2">All remaining funds raised will be applied exclusively for the benefit of the Members.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">4. Eligibility</h3>
            <p>Participation is open to Australian residents aged 18 years or older only.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">5. How to Enter</h3>
            <p>Numbers are allocated on a first-paid, first-allocated basis.</p>
            <p className="mt-2">A number is not secured until payment has been received and confirmed by the Organiser.</p>
            <p className="mt-2">Requests for specific numbers are subject to availability at the time payment is received.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">6. Payments and Fees</h3>
            <p>Payments are processed via Stripe.</p>
            <p className="mt-2">Stripe transaction fees will be passed on to participants as an addition to the entry price and clearly disclosed prior to payment.</p>
            <p className="mt-2">All other costs associated with establishing or operating the fundraiser platform are borne solely by the Organiser.</p>
            <p className="mt-2">All payments are final and non-refundable, except where required by law.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">7. Prize Draw</h3>
            <p>The winning number will be selected using a random number generator.</p>
            <p className="mt-2">The draw will occur on the earlier of:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>7 days after all numbers on the board are sold, or</li>
              <li>1 April 2026.</li>
            </ul>
            <p className="mt-2">The draw result is final.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">8. Winner Notification and Prize Payment</h3>
            <p>The winner will be notified directly using the contact details provided at entry.</p>
            <p className="mt-2">The prize of $500 AUD will be paid approximately 3 days after valid banking details are received.</p>
            <p className="mt-2">The Organiser is not responsible for delays caused by incomplete or incorrect information.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">9. Platform Disclaimer</h3>
            <p>This fundraiser is not sponsored, endorsed, administered by, or associated with Instagram, Meta, Stripe, or any other social media or payment platform.</p>
            <p className="mt-2">Participants release all such platforms from any responsibility in connection with the fundraiser.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">10. Liability</h3>
            <p>To the maximum extent permitted by law, the Organiser accepts no liability for loss, damage, or injury arising from participation, except where liability cannot be excluded.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">11. Privacy</h3>
            <p>Personal information is collected solely for administering the fundraiser and contacting the winner.</p>
            <p className="mt-2">Information will not be sold or shared with third parties.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">12. Changes or Cancellation</h3>
            <p>The Organiser reserves the right to amend these Terms or cancel the fundraiser if required due to unforeseen circumstances.</p>
            <p className="mt-2">Any refunds required by law will be processed accordingly.</p>
          </section>

          <section>
            <h3 className="font-bold text-white mb-1">13. Governing Law</h3>
            <p>These Terms are governed by the laws of Queensland, Australia.</p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-wrap gap-4 text-sm" style={{ fontFamily: "Poppins, sans-serif" }}>
          <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">Privacy Policy</a>
          <span className="text-gray-700">·</span>
          <a href="/customer-support" className="text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors">Customer Support</a>
        </div>
      </div>
    </div>
  );
}
