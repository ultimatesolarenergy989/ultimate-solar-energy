import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Ultimate Solar Energy",
  description: "Read Ultimate Solar Energy's terms and conditions for solar panel installation, services, warranties, and customer agreements in Australia.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="w-full bg-white py-12  pl-[10px] pr-[10px]">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#002866] mb-8 uppercase">
          TERMS AND CONDITIONS
        </h1>

        {/* Content Sections */}
        <div className="space-y-8 text-gray-700 leading-relaxed">
          {/* 1. Customer Declarations */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Customer Declarations:</h2>
            <p className="mb-3 ml-6">You declare that</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>This agreement is between Ultimate Solar Energy, referred to as "we" and "us", whereas, the customer named in the Quote, referred to as "you".</li>
              <li>This agreement highlights the Terms and Conditions; and the Quote attached to these Terms and Conditions.</li>
              <li>You are one of the registered owners of the property at the installation address and your name is on the title deed of the Installation Address.</li>
              <li>You have never received or have never been approved for any rebate, financial assistance solar credit or small-scale technology certificate (STCs) for small generation solar power system at the Installation Address.</li>
              <li>The Agreement covers:</li>
            </ul>
            <p className="ml-16 mt-3 mb-3">
              (a) Your purchase from us of the solar PV system and other equipment, referred to as the "System" and described in the Full System Design attached to this agreement; and
            </p>
            <p className="ml-16 mb-3">
              (b) Delivery and installation of the System at your Premises.
            </p>
            <ul className="list-disc ml-12 space-y-2">
              <li>In addition to this agreement, various laws and codes, including the Australian Consumer Law and, if we have volunteered to be bound by it, the CEC Solar Retailer Code of Conduct, also contain rules applicable to the sale and installation of solar PV systems, and we will comply with these rules in selling you the System and installing it at the Premises.</li>
            </ul>
          </section>

          {/* 2. Payment */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Payment</h2>
            <ul className="list-none ml-8 space-y-3">
              <li className="flex">
                <span className="mr-2">○</span>
                <span>You must pay us the Deposit at the same time as you accept our offer set out in the Quote. Payments under this agreement can be made by bank cheque, money order, cash, debit card, credit card or direct deposit.</span>
              </li>
              <li className="flex">
                <span className="mr-2">○</span>
                <span>Ultimate Solar Energy must have the final payment prior to OR on the day of the installation. If you prefer Electronic Fund transfer (EFT), the transaction must be completed 48 Hours prior to installation and you must provide us with written proof of the transfer.</span>
              </li>
              <li className="flex">
                <span className="mr-2">○</span>
                <span>If you have paid us money under this agreement, but the agreement ends for any of the following reasons before we install the System at your Premises, then when the agreement ends we will promptly refund all the money you have paid:</span>
              </li>
            </ul>
            <ul className="list-disc ml-12 space-y-2 mt-3">
              <li>if we have not delivered and installed the System at the Premises within 4 weeks after the original Target Date, and you choose to end the agreement.</li>
              <li>if we give you notice of a price increase under clause 3, and you choose to end the agreement in accordance with clause 3.3. rather than accept the price increase; or</li>
              <li>Grid Connection Approval is refused.</li>
              <li>If any of the equipment quoted is unattainable and you do not agree to equipment of a similar quality to be substituted</li>
            </ul>
          </section>

          {/* 3. Price Increases */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Price Increases:</h2>
            <p className="ml-8 mb-3">3.1 Subject to clause 3.2, we can increase the price of;</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>the System or any part of it;</li>
              <li>the installation of the System; or</li>
              <li>any other item specified in the Quote,</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">to cover any new or increased cost in selling and installing the System under this agreement.</p>
            <p className="ml-8 mb-3 font-semibold">3.2. We can only increase prices under clause 3.1 if:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>it is reasonable to do so;</li>
              <li>we are not prohibited by law from doing so; and</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">
              3.3. we give you written notice of the increase at least one week before the Target Date set out in the Quote, or, if we have notified you of a new Target Date.
            </p>
            <p className="ml-8 mb-3">
              3.4. If we give you notice of a price increase and you prefer to end this agreement rather than accept the price increase, you can end the agreement in accordance with clause 3.4. and, if you do, we will give you any refund required under clause 2.3(b).
            </p>
            <p className="ml-8 mb-3">
              3.5. You can end this agreement under clause 2.6. by calling us or giving a written notification by post or email before the target date or a new set target date
            </p>
            <p className="ml-8 mb-3">
              3.6. If we send you notice of a price increase and you do not end this agreement under clause 3.3 by the relevant date, you will be taken to have agreed to the price increase.
            </p>
            <p className="ml-8 mb-3">3.7. All amounts specified in the Quote are inclusive of GST.</p>
          </section>

          {/* 4. Approvals */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Approvals</h2>
            <p className="ml-8 mb-3">4.1. We will apply for Grid Connection Approval on your behalf. In doing this, we will:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>make the application as soon as possible;</li>
              <li>keep you updated on the progress of the application;</li>
              <li>respond, within a reasonable timeframe, to any information or other requests from the distributor; and</li>
              <li>promptly give you notice of the outcome of the application.</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">4.2. Your purchase of the System is subject to Grid Connection Approval being granted.</p>
            <p className="ml-8 mb-3">
              4.3. If Grid Connection Approval is refused, then this agreement will end, and we will give you any refund required under clause 2.3(c)
            </p>
            <p className="ml-8 mb-3">
              4.4. You are responsible for applying for and obtaining all the necessary approvals and consents required towards the installation of the system.
            </p>
          </section>

          {/* 5. Delivery and installation */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Delivery and installation</h2>
            <p className="ml-8 mb-3">5.1. We (if we install the System) or our contractor (if we procure a contractor to install the System) must:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>be a CEC-Accredited Installer; and</li>
              <li>install the System in accordance with the Clean Energy Council Design and Install Guidelines and all other requirements applicable to CEC-Accredited Installers.</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">
              5.2. After installation of the System, we will give you any certificate or similar document regarding the electrical safety of the System which is required by law.
            </p>
            <p className="ml-8 mb-3">
              5.3. Ultimate Solar Energy will make every reasonable effort to install your system in a timely manner. However, we will not be bound to meeting estimated or proposed delivery, installation or system completion dates as we have no control over for example, worldwide materials availability, peaks in demand created by changes in government legislation, inclement weather and/or other forms of force majeure. Delayed installation or grid connection is not a valid reason for claiming a refund or compensation from Ultimate Solar Energy. Please note that no responsibility for the delay in installation is acceptable if customer details (including installation site) are incorrect.
            </p>
            <p className="ml-8 mb-3">
              5.4. We will notify you if we do not think we can deliver and install the System at the Premises by the Target Date and give you a new Target Date. If we have not delivered and installed the System at the Premises within 4 weeks after the original Target Date, you can end this agreement and, if you do, we will give you any refund required
            </p>
            <p className="ml-8 mb-3">5.6. We (if we install the System) or our contractor (if we procure a contractor to install the System) must:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>be a CEC-Accredited Installer; and</li>
              <li>install the System in accordance with the Clean Energy Council Design and Install Guidelines and all other requirements applicable to CEC-Accredited Installers.</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">
              5.7. After installation of the System, we will give you any certificate or similar document regarding the electrical safety of the System which is required by law.
            </p>
            <p className="ml-8 mb-3">5.8. We will take every reasonable precaution in installing the System at the Premises. However, we will not be liable in respect of:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>the structural integrity of the roof;</li>
              <li>the roof's ability to carry the weight of the System;</li>
              <li>any effect installation of the System has on any roof manufacturer's warranty; or</li>
              <li>any damage to the roof or Premises which is not due to our negligence or breach of this agreement</li>
            </ul>
          </section>

          {/* 6. Accessing the Premises */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Accessing the Premises</h2>
            <p className="ml-8 mb-3">
              6.1. You authorise Ultimate Solar Energy and its contractors, employees and installers. Full access to the property at all reasonable times to carry out all work associated with the installation of your solar system including site Inspections, the signing of required paperwork, the delivery and installation of the PV Solar system, and connection to the grid.
            </p>
            <p className="ml-8 mb-3">
              6.2. Your co-operation is required to enable site inspections/installation to occur at the earliest possible time which is convenient to Ultimate Solar Energy provided we give you at least 3 Business Days' notice of the proposed access time.
            </p>
            <p className="ml-8 mb-3">6.3. You must:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>ensure we and our contractors have convenient and safe access to all parts of the Premises necessary to conduct any required site inspections or to deliver and install the System;</li>
              <li>not hinder or obstruct this access; and</li>
              <li>ensure the Premises, including its roof, supporting structures and electrical wiring, are sound and able to accommodate installation of the System.</li>
            </ul>
          </section>

          {/* 7. STC incentive */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">7. STC incentive</h2>
            <p className="ml-8 mb-3">7.1. We have calculated the STC Incentive based on:</p>
            <ul className="list-disc ml-12 space-y-2">
              <li>the maximum quantity of STCs that can be created in respect of the System under law, considering the Site-Specific Performance Estimate; and</li>
              <li>the monetary value of that quantity of STCs, and deducted the STC Incentive from the System Price</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">
              7.2. You are agreeing to pay Ultimate Solar Energy the STC's as part payment for your system. The STC's will be paid directly to Ultimate Solar Energy or a Ultimate Solar Energy Agent if the Office of Clean Energy Regulator (http://ret.cleanenergyregulator.gov.au/) determines you are not eligible to receive STC's, and therefore Ultimate Solar Energy is unable to receive the STC's as part payment, you will be liable to pay Ultimate Solar Energy the value of the STC's, as determined by market rates.
            </p>
            <p className="ml-8 mb-3">
              7.3. If you are not eligible for STC's, or if you wish to claim the STC's incentive yourself, the complete payment (including trading costs of the STC's) of the system is due before installation.
            </p>
            <p className="ml-8 mb-3">
              7.4. You acknowledge that if you breach any conditions of the STC's incentive regulations, you may be financially liable to the Office of Clean Energy Regulator. (http://ret.cleanenergyregulator.gov.au/). If you commit any breach of the Incentive Regulation, you acknowledge that Ultimate Solar Energy will not be liable to you.
            </p>
            <p className="ml-8 mb-3">
              7.5. We have calculated the Site-Specific Performance Estimate for the System and your Premises in accordance with the CEC System Design Guidelines. We must provide you with the Maintenance Documents and it is your responsibility to maintain the System in accordance with these documents.
            </p>
            <p className="ml-8 mb-3">7.6. If you do anything that:</p>
            <ul className="list-none ml-12 space-y-2">
              <li>(a) obstructs or avoids the assignment.</li>
              <li>(b) reduces the maximum quantity of STCs that can be created in respect of the System; or</li>
              <li>(c) renders the System ineligible for the creation of STCs,</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">
              then we can increase the Total Price by the amount of the STC Incentive, and you must pay us the STC Incentive within 10 Business Days of us invoicing you for it.
            </p>
            <p className="ml-8 mb-3">
              7.8 Clause 3 does not apply to any increase of the Total Price increases under clause 7.7, and you cannot end the agreement because of a price increase or refuse to accept it.
            </p>
          </section>

          {/* 8. Product Guarantee */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">8. Product Guarantee</h2>
            <p className="ml-8 mb-3">
              8.1. We guarantee our workmanship, and the workmanship of our contractors, in installing the System; and the operation and performance of the System,
            </p>
            <p className="ml-8 mb-3">
              8.2. System will be free from fault or defect for a period of 5 years commencing on the date the System is installed (<span className="font-bold">Guarantee Period</span>), and we will repair any such default or defect notified to us within the Guarantee Period, including by replacing all or part of the System where necessary, within a reasonable time-frame at no cost to you.
            </p>
            <p className="ml-8 mb-3 mt-6">8.3. The guarantee in clause 8.1 will not apply where:</p>
            <ul className="list-none ml-12 space-y-2">
              <li>(a) The fault or defect is not notified to us within the Guarantee Period; or</li>
              <li>(b) the fault or defect is a result of:</li>
            </ul>
            <p className="ml-16 mt-2">(i) something done by you or someone else, and not us or our contractors; or</p>
            <p className="ml-16">(ii) something beyond human control that occurred after installation, e.g., an extreme weather event;</p>
            <p className="ml-16">(iii) the System being misused, abused, neglected or damaged after installation;</p>
            <p className="ml-16">(iv) the System being maintained other than in accordance with the Maintenance Documents; or</p>
            <p className="ml-16">
              (v) the System being repaired, modified, reinstalled or repositioned by anyone other than a service technician approved by us in writing.
            </p>
            <p className="ml-8 mb-3 mt-4">8.4 The guarantee in clause 8.1 is additional to any other guarantee or warranty you may have:</p>
            <p className="ml-12">(a) from the manufacturer of the System; or</p>
            <p className="ml-12">(b) under any applicable law, including the Australian Consumer Law,</p>
            <p className="ml-8 mt-3">
              although these other guarantees and warranties may not cover labour costs, travel costs and delivery costs arising from a claim under these other guarantees and warranties. We will notify you if this is the case and tell you the costs payable. The costs will be payable in advance.
            </p>
            <p className="ml-8 mb-3 mt-4">
              8.5 During the Guarantee Period, we will provide reasonable assistance to you in making any guarantee or warranty claim against the manufacturer of the System, including by acting as your liaison with the manufacturer.
            </p>
          </section>

          {/* 9. Making a complaint */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-3">9. Making a complaint</h2>
            <p className="ml-8 mb-3 font-semibold">
              9.1. If you have a complaint relating to the System, its installation or this agreement generally, you can make a complaint to us by:
            </p>
            <ul className="list-disc ml-12 space-y-2">
              <li>calling us on our telephone number as set out in the Quote; or</li>
              <li>giving us written notice of this, by post or email.</li>
            </ul>
            <p className="ml-8 mt-3 mb-3">
              9.2. We will handle your complaint in accordance with our standard complaint's procedures. If we have volunteered to be bound by the CEC Solar Retailer Code of Conduct, then these procedures will comply with that Code, and with the Australian Standard on Complaints Handling AS ISO 10002-2006.
            </p>
            <p className="ml-8 mb-3 font-semibold">If you are still not satisfied</p>
            <p className="ml-8 mb-3">
              9.3. If you are not satisfied with the outcome of your complaint, you can refer the complaint to with the relevant Fair Trading or Consumer Affairs office in your state or territory, as follows:
            </p>
            <div className="ml-8 space-y-4 mt-4">
              <div>
                <p className="font-semibold">ACT: Office of Regulatory Services</p>
                <p>Phone: (02) 6207 3000</p>
              </div>
              <div>
                <p className="font-semibold">NSW: Fair Trading</p>
                <p>Phone: 13 32 20</p>
              </div>
              <div>
                <p className="font-semibold">NT: Consumer Affairs</p>
                <p>Phone: 1800 019 319</p>
              </div>
              <div>
                <p className="font-semibold">Qld: Office of Fair Trading</p>
                <p>Phone: 13 74 68</p>
              </div>
              <div>
                <p className="font-semibold">SA: Consumer and Business Services</p>
                <p>Phone: 13 18 82</p>
              </div>
              <div>
                <p className="font-semibold">Tas: Consumer Affairs and Fair Trading</p>
                <p>Phone: 1300 654 499</p>
              </div>
              <div>
                <p className="font-semibold">Vic: Consumer Affairs</p>
                <p>Phone: 1300 558 181</p>
              </div>
              <div>
                <p className="font-semibold">WA: Consumer Protection</p>
                <p>Phone: 1300 304 054</p>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Privacy:</h2>
            <ul className="list-disc ml-12 space-y-2">
              <li>
                You agree to provide Ultimate Solar Energy with whatever personal information is required for the efficient functioning of Ultimate Solar Energy on your behalf, for the accurate completion of the paperwork for the STC's incentive (selling the STCs) and network connection to the grid.
              </li>
              <li>Ultimate Solar Energy will provide your information to its contractors, employees and installers only as required to effectively perform their duties.</li>
              <li>
                Ultimate Solar Energy will provide your information, on your behalf to the relevant bodies for the processing the STC's incentive (selling the STCs), to the electricity distributor for connecting your PV Solar system to the grid and if required to your electricity retailer.
              </li>
              <li>
                Unless otherwise agreed with you, Ultimate Solar Energy will not provide your personal information to any third parties other than those mentioned above.
              </li>
              <li>You must sign all necessary documents on the date of installation for the performance of all party's obligations under this agreement.</li>
              <li>Ultimate Solar Energy will not sell your personal information under any circumstances.</li>
              <li>
                If you have any questions in relation to privacy, you can contact us by Calling us on our telephone number as set out in the Quote; or giving us written notice of this, by post or email.
              </li>
            </ul>
          </section>

          {/* 11. Termination */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">11. Termination</h2>
            <p className="ml-8 mb-3 font-semibold">Ultimate Solar Energy may terminate this contract with you if either of the following occurs:</p>
            <ol className="list-decimal ml-12 space-y-2">
              <li>You do not abide by the terms and conditions.</li>
              <li>There are delays in the Ultimate Solar Energy process causing supplier prices to increase; in which case full deposit will be refunded.</li>
              <li>
                Ultimate Solar Energy has full authority to cancel the installation if installation can't be possible. Customer will receive full refund of any deposit by cheque or other method.
              </li>
              <li>
                If you fail to make the required payment or perform the required obligation within one week after the date of our notice, then we may end this agreement immediately by notice to you.
              </li>
              <li>
                If we end this agreement under clause 11(d), you must pay us any costs we incur because of ending the agreement, and any costs we have already incurred in respect of the delivery or installation of the System.
              </li>
            </ol>
          </section>

          {/* 12. Cooling off Period */}
          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">12. Cooling off Period</h2>
            <p className="ml-8 mb-3">
              Important Notice to the Consumer. You have the right to cancel this agreement within 10 business from and including the day after you signed or accepted the proposal (for example, if you received a proposal on a Monday, you have until the next Thursday to cancel.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

