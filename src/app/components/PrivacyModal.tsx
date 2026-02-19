import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-950 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
              <h2
                className="text-xl text-white"
                style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "1px" }}
              >
                Privacy Policy
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div
              className="overflow-y-auto px-6 py-5 text-gray-300 text-sm space-y-5 leading-relaxed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <p className="font-bold text-white text-base">
                PRIVACY POLICY – MIDNIGHT MAFIA FUNDRAISER
              </p>

              <section>
                <h3 className="font-bold text-white mb-1">1. Introduction</h3>
                <p>
                  This Privacy Policy explains how personal information is handled in connection with the Midnight Mafia Numbers Board Fundraiser (the Fundraiser).
                </p>
                <p className="mt-2">
                  The Fundraiser is organised by Troy Morgan (the Organiser), acting solely as a volunteer to assist with fundraising for the cheerleading team Midnight Mafia (of Outlaws) (the Team).
                </p>
                <p className="mt-2">
                  The Organiser has no financial interest in the outcome of the Fundraiser and holds all funds raised solely for the benefit of the Team Members participating in The Cheerleading Worlds in April 2026.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">2. Information Collected</h3>
                <p>Personal information collected is limited to what is strictly necessary to administer the Fundraiser.</p>
                <p className="mt-2">This may include:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Payment confirmation details provided by Stripe</li>
                  <li>Selected number(s) on the numbers board</li>
                  <li>Banking details of the winner (for prize payment only)</li>
                </ul>
                <p className="mt-2">
                  No personal information is collected via website forms or direct communication unless required to administer the Fundraiser or pay the prize.
                </p>
                <p className="mt-2">
                  The Organiser does not collect, store, process, or have access to any credit card or payment card details at any time. All payment card information is handled exclusively by Stripe.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">3. How Information Is Collected</h3>
                <p>Personal information is collected only through:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Stripe, during payment processing</li>
                  <li>Direct communication only where necessary, such as:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>confirming entry details</li>
                      <li>contacting the winner</li>
                      <li>obtaining banking details for prize payment</li>
                    </ul>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">4. Use of Information</h3>
                <p>Personal information is used solely to:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Administer the Fundraiser</li>
                  <li>Allocate and record numbers on the board</li>
                  <li>Confirm payments</li>
                  <li>Conduct the prize draw</li>
                  <li>Contact and pay the winner</li>
                  <li>Comply with legal or regulatory obligations</li>
                </ul>
                <p className="mt-2">Personal information is not used for marketing or any unrelated purpose.</p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">5. Disclosure of Information</h3>
                <p>Personal information may be disclosed only to:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Stripe, for payment processing</li>
                  <li>Service providers strictly necessary to operate the Fundraiser</li>
                  <li>Government or regulatory authorities where required by law</li>
                </ul>
                <p className="mt-2">Personal information is not sold, rented, or shared for commercial purposes.</p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">6. Method of Disclosure</h3>
                <p>Disclosure occurs only through:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Secure electronic transmission to Stripe</li>
                  <li>Secure electronic communication required to administer the Fundraiser</li>
                  <li>Lawful disclosure under Australian law</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">7. Data Security</h3>
                <p>Reasonable steps are taken to safeguard personal information, including:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Use of Stripe, a PCI-compliant payment processor</li>
                  <li>Restricting access to personal information to the Organiser only</li>
                  <li>Secure, password-protected storage</li>
                  <li>Retention of information only for as long as necessary</li>
                </ul>
                <p className="mt-2">No method of electronic transmission is completely secure.</p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">8. Access and Correction</h3>
                <p>
                  Participants may request access to or correction of their personal information by contacting the Organiser.
                </p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">9. Retention of Information</h3>
                <p>Personal information is retained only for as long as necessary to:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>Complete the Fundraiser</li>
                  <li>Pay the prize</li>
                  <li>Meet legal or accounting obligations</li>
                </ul>
                <p className="mt-2">Information is then securely deleted or destroyed.</p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">10. Changes to This Policy</h3>
                <p>This Privacy Policy may be updated if required. Any updates will be published on the website.</p>
              </section>

              <section>
                <h3 className="font-bold text-white mb-1">11. Contact</h3>
                <p>Privacy enquiries should be directed to:</p>
                <p className="mt-2 font-semibold text-gray-200">Troy Morgan</p>
                <p>Volunteer Organiser – Midnight Mafia Fundraiser</p>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-800 shrink-0">
              <button
                onClick={onClose}
                className="w-full bg-purple-700 hover:bg-purple-600 text-white rounded-xl py-2.5 font-semibold transition-colors"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
