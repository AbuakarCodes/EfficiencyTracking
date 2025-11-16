import { motion } from "framer-motion"
import { Link } from "react-router"
import Navbar from "../Components/navbar"
import GithubSVG from "../assets/github.svg"
import LinkdinSVG from "../assets/linkedin.svg"

export default function AboutPage() {
  const sections = [
    {
      title: "About the Developer",
      content: [
        "Hi, I'm Abubakar! A university student with a passion for coding and a knack for solving real-world problems.",
        "I love transforming ideas into practical projects that actually make life easier for students and professionals.",
        "Coding isn’t just work for me—it’s a playground where creativity meets problem-solving.",
      ],
    },
    {
      title: "About the Project",
      content: [
        "Optivo is an innovative Efficiency Tracking App designed for students and busy professionals.",
        "It lets you monitor your productivity daily, monthly, and yearly, set timers, and dive into insightful analytics.",
        "With live stats and comparison tools, you can track your growth and stay ahead of your goals effortlessly.",
      ],
    },
    {
      title: "Future Plans",
      content: [
        "I’m planning to add a leaderboard so users can challenge themselves and others for motivation.",
        "A built-in clock will track time spent on tasks, helping users optimize every minute.",
        "Gamification is coming soon: earn badges, unlock achievements, and make productivity fun and rewarding.",
      ],
    },
  ]

  return (
    <div className="bg-white text-black min-h-screen font-sans">
      <Navbar></Navbar>

      <header className="relative flex flex-col items-center justify-center text-center py-24">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4"
        >
          Optivo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-xl max-w-3xl"
        >
          Track your efficiency, optimize your time, and boost productivity.
          Designed for students and professionals who want real results.
        </motion.p>
      </header>

      <main className="max-w-5xl mx-auto px-6 space-y-24 pb-[3rem]">
        <section className="w-full mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video"
          >
            <iframe
              className="w-full h-full rounded-lg shadow-lg"
              src="https://www.youtube.com/embed/MmlC1-7prI0?enablejsapi=1"
              title="Optivo Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </section>

        {sections.map((section, idx) => (
          <motion.section
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
            className="flex flex-col md:flex-row items-center gap-12"
          >
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold border-b border-black/20 pb-2">
                {section.title}
              </h2>
              {section.content.map((line, i) => (
                <p key={i} className="text-gray-800 text-lg">
                  {line}
                </p>
              ))}
              {idx == 0 ? (
                <div className="flex items-center justify-start gap-x-2 md:gap-x-4">
                  <Link to={"https://github.com/AbuakarCodes"} target="_blank">
                    <img src={GithubSVG} />{" "}
                  </Link>
                  <Link
                    to={
                      "https://www.linkedin.com/in/abubakar-zahid895?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                    }
                    target="_blank"
                  >
                    <img src={LinkdinSVG} />{" "}
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  )
}
