import React from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'

const TermsPage = styled.div`
  padding: 20px 40px;
  background: rgba(245, 245, 245, 1);
  .header {
    text-transform: uppercase;
    color: ${(props) => props.theme.second};
    font-size: 21px;
  }
`

const terms = () => {
  return (
    <>
      <TermsPage>
        <h1>Terms and Conditions of Use</h1>
        <div> Effective Date: August 2, 2020 </div>
        <div>
          This Terms and Conditions of Use Agreement (the “Agreement”) is
          between you and Lindsey Harrod (“Lindsey Harrod”). The Lindsey Harrod
          brand is comprised of a website, associated widgets, livestreams,
          social media platforms, mobile applications and other distribution
          platforms (the “Sites”) operated by Lindsey Harrod.
        </div>
        <div>
          <h1 className="header">ACCEPTANCE OF TERMS:</h1> The Sites are offered
          to you conditioned on your acceptance without modification of the
          terms, conditions, and notices contained herein. Your use of the Sites
          and Services, as defined below, constitutes your agreement to all such
          terms, conditions, and notices.
        </div>
        <div>
          <h1 className="header">PERSONAL SERVICE:</h1>The services provided by
          the Sites (the “Services”) are made available for your personal,
          non-commercial use only. You may not use the Services to sell a
          product or service or to increase traffic to your business for
          commercial reasons, such as advertising sales. If you want to make
          commercial use of our Services, you must enter into an agreement and
          do so in advance. Please contact us for more information.
        </div>
        <div>
          <h1 className="header">ONLINE WORKOUTS:</h1> Lindsey Harrod offers
          streaming online workouts that are both live and pre-recorded, and can
          be accessed via your paid membership portal. Certain live workouts
          will be available for replay for up to 48-hours only.{' '}
        </div>
        <div>
          <h1 className="header">USE OF THE SERVICE:</h1> You understand that
          physical exercise can be strenuous and can expose you to the risk of
          serious injury. We urge you to obtain a physical examination from a
          doctor before participating in any exercise activity. You voluntarily
          assume any and all risks, known or unknown, associated with your use
          of the Service (collectively “Your Participation”). You acknowledge
          that Your Participation may present certain risks, and hereby assume
          any and all risks associated therewith, including, without limitation,
          the risk of physical or mental or emotional injury, minor and/or
          severe bodily harm, and/or illness, which arise by any means,
          including, without limitation: acts, omissions, recommendations or
          advice given by the Released Parties (defined below).
        </div>
        <div>
          {' '}
          Notwithstanding the foregoing, you hereby agree to voluntarily accept
          and assume any and all such risks as well as any risks not mentioned
          herein that are in anyway associated with Your Participation,
          including those described in the Liability Waiver, Agreement to
          Participate and Assumption of Risk. You agree that by participating in
          physical exercise or training activities, you do so entirely at your
          own risk.
        </div>
        <div>
          <h1 className="header">PAYMENTS:</h1> Payments made on the Sites are
          processed by Stripe. You are asked to a store credit card on file
          within your Stripe account for: (1) incidental charges relating to
          your use of the Sites, (2) ease of transaction, and/or (3) auto-debit
          memberships. In such event that an incidental charge needs to be made,
          the cardholder and account holder gives permission to Lindsey Harrod
          to charge the card on file for purchases made through the Site.
          Additionally, the cardholder and account holder may give permission to
          Lindsey Harrod to charge the card for auto-debit memberships.{' '}
        </div>
        <div>
          <h1 className="header">AUTO-DEBIT: </h1>By enrolling in an auto-debit
          contract, you authorize Lindsey Harrod to, on a recurring basis,
          automatically charge the debit or credit card account you specified,
          for the auto-debit plan associated with your account, on the billing
          due date. You understand and acknowledge that (1) Lindsey Harrod will
          initiate transfers/charges pursuant to this authorization not to
          exceed the amount shown on the billing invoice and/or in connection
          with cancellation fees per the cancellation policy. Lindsey Harrod may
          discontinue processing of recurring charges if it is unable to secure
          funds from your debit/card due to, but not limited to, insufficient or
          uncollected funds in the account or insufficient or inaccurate
          information provided; (2) if you are booked for a session past the
          subsequent billing date, and your debit/credit card fails to bill
          properly, that you may be removed from any sessions past the
          subsequent billing date and notified via electronic mail; (3) it is
          your responsibility to keep a current card on file with accurate
          billing information. Lindsey Harrod cannot be held responsible for
          errors in processing due to expired or inaccurate information.
        </div>
        <div>
          <h1 className="header">CANCELLATION POLICY: REFUND OF PURCHASES: </h1>
          Due to the nature of the offerings, no cancellations or refunds will
          be given for on-demand or live-stream workouts, or any other offering
          on the Sites unless explicitly indicated that there is a refund
          policy. In this instance, the refund policy will be clearly stated
          when purchasing.{' '}
        </div>
        <div>
          {' '}
          If you have a private session booked with a Lindsey Harrod instructor,
          there is a strict 24-hour cancellation policy for all private
          sessions. If you cancel within a 24-hour window, or do not show up for
          your scheduled session, you will be charged the full amount for your
          session, or forfeit a class if you have a package.{' '}
        </div>
        <div>
          {' '}
          As such, a credit card must be kept on file within your account in the
          event that you do not have a current package to debit a session from.{' '}
        </div>
        <div>
          <h1 className="header">DELIVERY:</h1> After making a purchase through
          Lindsey Harrod you may access and view your purchased workout through
          your account only. You will receive an email confirmation of the
          purchase and a receipt.{' '}
        </div>
        <div>
          <h1 className="header">RELEASE: </h1>You expressly agree to release
          and discharge the instructor and Lindsey Harrod and each of their
          respective parents, subsidiaries, related and affiliated companies,
          licensees, sponsors, successors, assigns and the directors, officers,
          employees, agents contractors, partners, shareholders, representatives
          and members of the foregoing entities or other persons affiliated with
          the Sites (the “Released Parties”) from all claims or causes of action
          and you agree to voluntarily give up or waive any right that you may
          otherwise have to bring a legal action against the Released Parties
          for personal injury or property loss.{' '}
        </div>
        <div>
          <h1 className="header">MODIFICATION OF THESE TERMS OF USE:</h1>{' '}
          Lindsey Harrod reserves the right to change the terms, conditions, and
          notices under which the Sites are offered, including but not limited
          to the charges associated with the use of the Services.
        </div>
        <div>
          <h1 className="header">REGISTRATION INFORMATION: </h1>The Sites are
          not directed at children under eighteen years of age. By providing
          information about yourself to Lindsey Harrod you are representing that
          you are eighteen years of age or older, or have a parent/guardian’s
          approval and supervision, and that you, or your parent/guardian, is of
          legal age to form a binding contract, and are not a person barred from
          receiving services under the laws of the United States or other
          applicable jurisdiction.{' '}
        </div>
        <div>
          {' '}
          You also agree to (1) provide true, accurate, current and complete
          information about yourself as prompted by the registration form
          available on our Sites; and (2) maintain and promptly update your
          information to keep it true, accurate, current and complete.
        </div>
        <div>
          {' '}
          If you provide any information that is untrue, inaccurate, not current
          or incomplete, or we have reasonable grounds to suspect that such
          information is untrue, inaccurate, not current or incomplete, Lindsey
          Harrod reserves the right to suspend or terminate your account and
          refuse any and all current or future use of the Service (or any
          portion thereof) at any time.
        </div>
        <div>
          <h1 className="header">
            PASSWORDPROTECTION: NO SHARING OF ACCOUNT INFORMATION:{' '}
          </h1>
          To access certain features of the Sites, You will need a username and
          password. You agree to keep this information confidential and not
          share it with anyone else. If Lindsey Harrod has reasonable grounds to
          suspect that You have shared your username and password with anyone
          else, or forwarded copyrighted materials such as video recordings, to
          any other person, Lindsey Harrod has the right to suspend or terminate
          Your account and refuse all current or future use of the website,
          without refund. Further, excessive usage of the Sites will be assumed
          by Lindsey Harrod to be fraudulent use, and your account will be
          immediately canceled without a refund.
        </div>
        <div>
          <h1 className="header">HOSTING PLATFORM:</h1> Lindsey Harrod is hosted
          on a private platform, and maintained by a third-party who is
          responsible for all login/account information and payment
          transactions. Lindsey Harrod does not have access to your account
          details. In the event of technical issues with your account, you may
          request account help through the Sites. If you would like more
          information on how Lindsey Harrod collects and stores information, you
          may view the Privacy Policy.{' '}
        </div>
        <div>
          <h1 className="header">LINKS TO THIRD PARTY WEBSITES:</h1> The Sites
          may contain links to other websites (the “Linked Sites”). The Linked
          Sites are not under the control of Lindsey Harrod, and Lindsey Harrod
          is not responsible for the contents of any Linked Site, including
          without limitation any link contained in a Linked Site, or any changes
          or updates to a Linked Site. Lindsey Harrod is providing these links
          to you only as a convenience, and the inclusion of any link does not
          imply endorsement by Lindsey Harrod of the site or any association
          with its operators.
        </div>
        <div>
          <h1 className="header">NO UNLAWFUL OR PROHIBITED USE:</h1> As a
          condition of your use of the Sites, you warrant to Lindsey Harrod that
          you will not use the Sites for any purpose that is unlawful or
          prohibited by these terms, conditions, and notices. You may not use
          the Sites in any manner that could damage, disable, overburden, or
          impair the Sites or interfere with any other party’s use and enjoyment
          of the Sites. You may not send automated queries of any sort to the
          Sites without express permission in advance from Lindsey Harrod.
          Similarly, you are not allowed to copy, create a derivative work of,
          reverse engineer, reverse assemble, or otherwise attempt to discover
          any source code of, or modify the Sites in any manner.
        </div>
        <div>
          <h1 className="header">COPYRIGHTED CONSENT:</h1> The Sites contain
          copyrighted material owned by Lindsey Harrod and protected under
          United States copyright laws, including the Copyright Act of 1976. Any
          reproduction or unauthorized use shall constitute infringement.
          Duplicating, recording, modifying, republishing, uploading, posting,
          distributing, or otherwise sharing materials or information obtained
          through the Sites is considered stealing and Lindsey Harrod may
          prosecute such misconduct to the fullest extent permitted by law.{' '}
        </div>
        <div>
          <h1 className="header">TRADEMARKS, NAMES, LOGOS:</h1> All trademarks,
          names, and logos used on the Sites or delivered via the Services are
          either owned by Lindsey Harrod or a use right has been granted to
          Lindsey Harrod. Your use of the Services and Sites does not allow you
          to infringe those rights or the rights of the third parties that may
          exist in material contained in the Sites. No license is expressly
          impliedly granted within or as a result of your use of the Sites or
          Services. Without the prior permission of Lindsey Harrod, except in
          the utilization of our widgets or mobile applications, you agree not
          to display or use in any manner, any of the trademarks, names, and
          logo featured on the Sites for which you do not have personal rights.
        </div>
        <div>
          <h1 className="header">
            MATERIALS PROVIDED TO LINDSEY HARROD OR POSTED ON THE SITES:{' '}
          </h1>
          Lindsey Harrod does not claim ownership of the materials you provide
          to Lindsey Harrod (including feedback, comments, and suggestions) or
          post, upload, input or submit to the Sites or its associated services
          (collectively “Submissions”). However, by posting, uploading,
          inputting, providing or submitting your Submission you are granting
          Lindsey Harrod permission to use your Submission in connection with
          the operation of their business including, without limitation, the
          rights to: copy, distribute, transmit, publicly display, publicly
          perform, reproduce, edit, translate and reformat your Submission; and
          to publish your name in connection with your Submission.
        </div>
        <div>
          {' '}
          No compensation will be paid with respect to the use of your
          Submission, as provided herein. Lindsey Harrod is under no obligation
          to post or use any Submission you may provide and may remove any
          Submission at any time at the sole discretion of Lindsey Harrod.
        </div>
        <div>
          By posting, uploading, inputting, providing or submitting your
          Submission you warrant and represent that you own or otherwise control
          all of the rights to your Submission as described in this section
          including, without limitation, all the rights necessary for you to
          provide, post, upload, input or submit the Submissions.
        </div>
        <div>
          <h1 className="header">LIABILITYOF DISCLAIMER:</h1> THE INFORMATION,
          SOFTWARE, PRODUCTS, AND SERVICES INCLUDED IN OR AVAILABLE THROUGH THE
          SITES MAY INCLUDE INACCURACIES. CHANGES ARE PERIODICALLY ADDED TO THE
          INFORMATION HEREIN. LINDSEY HARROD MAY MAKE IMPROVEMENTS AND/OR
          CHANGES IN THE SITES AT ANY TIME.{' '}
        </div>
        <div>
          <strong>
            LINDSEY HARROD MAKE NO REPRESENTATIONS ABOUT THE SUITABILITY,
            RELIABILITY, AVAILABILITY, TIMELINESS, AND ACCURACY OF THE
            INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS
            CONTAINED ON THE SITES FOR ANY PURPOSE. TO THE MAXIMUM EXTENT
            PERMITTED BY APPLICABLE LAW, ALL SUCH INFORMATION, SOFTWARE,
            PRODUCTS, SERVICES AND RELATED GRAPHICS ARE PROVIDED “AS IS” WITHOUT
            WARRANTY OR CONDITION OF ANY KIND. LINDSEY HARROD DISCLAIMS ALL
            WARRANTIES AND CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE,
            PRODUCTS, SERVICES AND RELATED GRAPHICS, INCLUDING ALL IMPLIED
            WARRANTIES OR CONDITIONS OF MERCHANTABILITY, OF LINDSEY HARROD FOR A
            PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM
            EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL LINDSEY HARROD
            BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER INCLUDING, WITHOUT
            LIMITATION, DAMAGES FOR LOSS OF USE, DATA OR PROFITS, ARISING OUT OF
            OR IN ANYWAY CONNECTED WITH THE USE OR PERFORMANCE OF THE SITES,
            WITH THE DELAY OR INABILITY TO USE THE SITES OR RELATED SERVICES,
            THE PROVISION OF OR FAILURE TO PROVIDE SERVICES, OR FOR ANY
            INFORMATION, SOFTWARE, PRODUCTS, SERVICES AND RELATED GRAPHICS
            OBTAINED THROUGH THE SITES, OR OTHERWISE ARISING OUT OF THE USE OF
            THE SITES, WHETHER BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT
            LIABILITY OR OTHERWISE, EVEN IF LINDSEY HARROD HAS BEEN ADVISED OF
            THE POSSIBILITY OF DAMAGES. BECAUSE SOME STATES/JURISDICTIONS DO NOT
            ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR
            INCIDENTAL DAMAGES, THE ABOVE LIMITATION MAY NOT APPLY TO YOU. IF
            YOU ARE DISSATISFIED WITH ANY PORTION OF THE SITES, OR WITH ANY OF
            THESE TERMS OF USE, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE
            USING THE SITES.
          </strong>
        </div>
        <div>
          <h1 className="header">TERMINATION AND ACCESS RESTRICTION:</h1>{' '}
          Lindsey Harrod reserves the right, in its sole discretion, to
          terminate your access to the Sites and the related services or any
          portion thereof at any time, without notice.
        </div>
        <div>
          <h1 className="header">PRIVACY POLICY:</h1> Lindsey Harrod respects
          your privacy and permits you to control certain aspects of the
          treatment of your personal information as set forth in our Privacy
          Policy. The Privacy Policy is expressly incorporated into this
          Agreement by this reference
        </div>
        <div>
          <h1 className="header">GENERAL: </h1>To the maximum extent permitted
          by law, this agreement is governed by the Laws of the State of
          California, United States, and you hereby consent to the exclusive
          jurisdiction and venue of courts in Los Angeles County, California,
          United States. In all disputes arising out of or relating to the use
          of the Sites. All claims and disputes arising under or relating to
          this Agreement are to be settled by arbitration in the State of
          California, County of Los Angeles, before one arbitrator with no less
          than 10 years of active litigation practice. This arbitration shall
          proceed solely on an individual basis without the right for any Claims
          to be arbitrated on a class-action basis or in a purported
          representative capacity on behalf of others. Claims may not be joined
          or consolidated unless agreed to in writing by all parties. The
          arbitration shall be administered under the rules of the American
          Arbitration Association and shall include a written record of the
          arbitration hearing. The arbitrator is not empowered to award punitive
          or exemplary damages, except where permitted by statute, and the
          parties waive any right to recover any such damages. Judgment on the
          Award may be entered in the State of California, in the County of Los
          Angeles.
        </div>
        <div>
          Use of the Sites is unauthorized in any jurisdiction that does not
          give effect to all provisions of this Terms and Conditions of Use
          Agreement, including without limitation this paragraph. You agree that
          no joint venture, partnership, employment, or agency relationship
          exists between you and Lindsey Harrod as a result of this agreement or
          use of the Sites. Lindsey Harrod performance of this Agreement is
          subject to existing laws and legal process, and nothing contained in
          this agreement is in derogation of Lindsey Harrod right to comply with
          governmental, court and law enforcement requests or requirements
          relating to your use of the Sites or information provided to or
          gathered by Lindsey Harrod with respect to such use.
        </div>
        <div>
          If any part of this agreement is determined to be invalid or
          unenforceable pursuant to applicable law including, but not limited
          to, the warranty disclaimers and liability limitations set forth
          above, then the invalid or unenforceable provision will be deemed
          superseded by a valid, enforceable provision that most closely matches
          the intent of the original provision and the remainder of the
          agreement shall continue in effect.
        </div>
        <div>
          Unless otherwise specified herein, this agreement constitutes the
          entire agreement between you and Lindsey Harrod with respect to the
          Sites and it supersedes all prior or contemporaneous communications
          and proposals, whether electronic, oral or written, between the user
          and Lindsey Harrod with respect to the Sites. A printed version of
          this agreement and of any notice given in electronic form shall be
          admissible in judicial or administrative proceedings based upon or
          relating to this agreement to the same extent and subject to the same
          conditions as other business documents and records originally
          generated and maintained in printed form. It is the express wish to
          the parties that this agreement and all related documents be drawn up
          in English.
        </div>
        This Agreement and your agreement to it and to use of the Sites and
        Services are for the benefit of Lindsey Harrod and its affiliates,
        successors or assigns.
        <div>
          <h1 className="header">CONTACT:</h1>
        </div>
        info@lindseyharrod.com <br />
        LindseyHarrod.com
      </TermsPage>
      <Footer />
    </>
  )
}

export default terms
