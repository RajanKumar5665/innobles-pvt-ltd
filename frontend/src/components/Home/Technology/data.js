import {
  SiAndroid,
  SiAndroidstudio,
  SiBitbucket,
  SiBootstrap,
  SiCodeigniter,
  SiComposer,
  SiCss,
  SiDocker,
  SiElementor,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGitlab,
  SiGradle,
  SiHtml5,
  SiOpenjdk,
  SiJavascript,
  SiJquery,
  SiJsonwebtokens,
  SiKotlin,
  SiLaravel,
  SiMongodb,
  SiMongoose,
  SiMui,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRedis,
  SiSass,
  SiSocketdotio,
  SiSwagger,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
  SiWoocommerce,
  SiWordpress,
} from "react-icons/si";
import { TbBrandAws, TbBrandVscode } from "react-icons/tb";

/**
 * Flat, data-driven list of technologies rendered as one continuous dense grid
 * (no forced category blocks) to match the reference design. Every entry uses a
 * REAL brand icon from the installed react-icons (simple-icons / tabler)
 * library — no external images and no letter placeholders. Edit the array
 * freely; the grid renders entirely from `technologies`.
 *
 * Technologies without a real brand icon in the library (e.g. Retorfit, MVVM,
 * Dagger Hilt, Room Database, AJAX) were intentionally omitted rather than
 * faked, per the "do not create fake logos" requirement.
 */
export const technologies = [
  /* ---- Web / Frontend ---- */
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "Material UI", icon: SiMui, color: "#007FFF" },

  /* ---- Backend / Data ---- */
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Mongoose", icon: SiMongoose, color: "#880000" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Redis", icon: SiRedis, color: "#DC382D" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Socket.io", icon: SiSocketdotio, color: "#010101" },
  { name: "JWT", icon: SiJsonwebtokens, color: "#000000" },

  /* ---- PHP / WordPress ---- */
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "CodeIgniter", icon: SiCodeigniter, color: "#EE4323" },
  { name: "WordPress", icon: SiWordpress, color: "#21759B" },
  { name: "WooCommerce", icon: SiWoocommerce, color: "#96588A" },
  { name: "Elementor", icon: SiElementor, color: "#92003B" },
  { name: "Sass", icon: SiSass, color: "#CC6699" },
  { name: "jQuery", icon: SiJquery, color: "#0769AD" },
  { name: "Composer", icon: SiComposer, color: "#885630" },
  { name: "REST API", icon: SiSwagger, color: "#85EA2D" },

  /* ---- Android ---- */
  { name: "Android", icon: SiAndroid, color: "#3DDC84" },
  { name: "Kotlin", icon: SiKotlin, color: "#7F52FF" },
  { name: "Java", icon: SiOpenjdk, color: "#E76F00" },
  { name: "Android Studio", icon: SiAndroidstudio, color: "#3DDC84" },
  { name: "Gradle", icon: SiGradle, color: "#02303A" },

  /* ---- Tools / Development ---- */
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#181717" },
  { name: "GitLab", icon: SiGitlab, color: "#FC6D26" },
  { name: "Bitbucket", icon: SiBitbucket, color: "#0052CC" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "AWS", icon: TbBrandAws, color: "#FF9900" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "VS Code", icon: TbBrandVscode, color: "#007ACC" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];
