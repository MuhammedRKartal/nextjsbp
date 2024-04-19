import { Section } from '@/components/section';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About WoW Tasker',
  description: `We are a dedicated team of experienced developers who have spent
  decades immersed in World of Warcraft. Our bot is
  designed to suit your needs.`
};

export default function About() {
  return (
    <Section>
      <h1 className="text-4xl font-bold lg:text-3xl mb-6 pb-3 border-b-2 border-secondary-darkest">
        About Us
      </h1>
      <div className="flex flex-col-reverse flex-wrap items-center xl:flex-row gap-3">
        <ul className="flex-none text-base w-full [&>li]:mb-2 xl:flex-1">
          <li>
            We are a dedicated team of experienced developers who have spent
            decades immersed in World of Warcraft. Our comprehensive knowledge
            covers every aspect of the game as we've strived to min/max to the
            absolute extreme.
          </li>
          <li>
            The journey of World of Warcraft bot development community has been
            both exciting and frustrating. As veterans in the field, we
            understand the challenges and the unique culture that surrounds
            botting. Over the years, we have witnessed numerous changes in the
            botting landscape, and we have seen the community evolve.
          </li>
          <li>
            However, it is this very community that has left us feeling
            frustrated. We have seen a lack of innovation in botting products,
            with many developers failing to provide the features that operators
            truly need. This lack of progression has hindered the potential of
            botting and has left many operators unsatisfied with their
            experiences.
          </li>
          <li>
            Driven by our passion for both the game and the botting community,
            we have taken it upon ourselves to bridge this gap. Our aim is to
            revolutionize the botting experience by providing a solution that
            caters to the diverse needs of botting operators. We have worked
            tirelessly to create a bot that encompasses every feature
            imaginable.
          </li>
          <li>
            Unlike other products on the market, we believe that price should
            not hinder anyone's ability to enjoy the benefits of botting. We
            have adopted an affordable and transparent pricing structure,
            ensuring that our product remains accessible to all operators who
            wish to enhance their World of Warcraft experience.
          </li>
          <li>
            Our commitment to the community goes beyond just the development of
            our bot. We understand the importance of constant improvement and
            listen carefully to our operators feedback. We value the trust
            placed in us and strive to maintain an open and honest relationship
            with our community.
          </li>
          <li>
            So, whether you are a seasoned player seeking to optimize your
            efficiency or a new adventurer looking for assistance, our bot is
            designed to suit your needs. With every feature that you can imagine
            and the affordability that you deserve, we invite you to embark on
            our journey.
          </li>
          <li>
            Join us and witness the next level of botting innovation in World of
            Warcraft. Together, let's redefine what it means to have the
            complete botting experience.
          </li>
        </ul>

        <div className="flex justify-center w-full flex-none xl:flex-1">
          <Image
            width={250}
            height={250}
            src={'/assets/WoWTaskerMinimized300x300.png'}
            alt="WoW Tasker Logo"
          ></Image>
        </div>
      </div>
    </Section>
  );
}
