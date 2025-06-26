"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Copy, Check, Sun, Moon, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

interface SignatureData {
  fullName: string
  title: string
  phone: string
  email: string
  website: string
  instagram: string
  tagline: string
}

export default function EmailSignatureGenerator() {
  const { theme, setTheme } = useTheme()
  const [signatureData, setSignatureData] = useState<SignatureData>({
    fullName: "",
    title: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    tagline: "",
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleInputChange = (field: keyof SignatureData, value: string) => {
    setSignatureData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateHtmlSignature = () => {
    return `<table cellpadding="0" cellspacing="0" border="0" style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.4; color: currentColor; border-collapse: collapse;">
<tr>
<td style="vertical-align: top; padding-right: 0px;">
<svg width="27" height="41" viewBox="0 0 27 41" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 48px; height: 48px; display: block;">
<path d="M21.3031 13.3992C21.2031 13.0992 20.9031 12.8992 20.5031 12.8992H5.00312C4.70312 12.8992 4.50312 12.6992 4.50312 12.3992V1.49922C4.50312 0.999218 4.10313 0.699219 3.70312 0.699219H1.50312C1.00312 0.699219 0.703125 1.09922 0.703125 1.49922V39.9992C0.703125 40.4992 1.10312 40.7992 1.50312 40.7992H19.4031C19.7031 40.7992 20.0031 40.5992 20.1031 40.3992L26.4031 29.4992C26.8031 28.7992 26.9031 27.9992 26.6031 27.2992L21.4031 13.3992H21.3031ZM21.9031 29.2992L17.9031 36.2992C17.7031 36.6992 17.3031 36.8992 16.8031 36.8992H5.00312C4.70312 36.8992 4.50312 36.6992 4.50312 36.3992V17.2992C4.50312 16.9992 4.70312 16.7992 5.00312 16.7992H17.5031C18.0031 16.7992 18.5031 17.0992 18.7031 17.5992L22.1031 26.7992C22.4031 27.5992 22.3031 28.5992 21.9031 29.2992Z" fill="currentColor"/>
</svg>
</td>
<td style="vertical-align: top; padding-top: 20px; padding-left: 20px;">
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
${signatureData.fullName ? `<tr><td style="font-weight: bold; margin: 0; padding: 0 0 1px 0; color: currentColor; font-size: 16px; font-family: 'Courier New', monospace;">${signatureData.fullName}</td></tr>` : ""}
${signatureData.title ? `<tr><td style="color: currentColor; opacity: 0.6; margin: 0; padding: 0 0 1px 0; font-size: 14px; font-weight: bold; font-family: 'Courier New', monospace;">${signatureData.title}</td></tr>` : ""}
${signatureData.phone ? `<tr><td style="margin: 0; padding: 0 0 1px 0; color: currentColor; opacity: 0.6; font-size: 14px; font-weight: bold; font-family: 'Courier New', monospace;">tel.: ${signatureData.phone}</td></tr>` : ""}
${signatureData.email ? `<tr><td style="margin: 0; padding: 0 0 18px 0; color: currentColor; opacity: 0.6; font-size: 14px; font-weight: bold; font-family: 'Courier New', monospace;">mail: <a href="mailto:${signatureData.email}" style="color: currentColor; opacity: 0.6; text-decoration: none; font-weight: bold;">${signatureData.email}</a></td></tr>` : ""}
${signatureData.website ? `<tr><td style="margin: 0; padding: 0 0 1px 0; font-size: 15px; font-weight: bold; font-family: 'Courier New', monospace;"><a href="https://${signatureData.website}" style="color: currentColor; text-decoration: none; font-weight: bold;">${signatureData.website}</a></td></tr>` : ""}
${signatureData.instagram ? `<tr><td style="margin: 0; padding: 0 0 40px 0; font-size: 15px; font-family: 'Courier New', monospace; font-weight: bold;"><a href="https://instagram.com/${signatureData.instagram}" style="color: currentColor; text-decoration: none; font-weight: bold;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style="display: inline-block; vertical-align: middle;"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a></td></tr>` : ""}
${signatureData.tagline ? `<tr><td style="color: currentColor; opacity: 0.6; margin: 0; padding: 16px 0 0 0; font-size: 14px; font-family: 'Courier New', monospace; font-weight: bold;">// ${signatureData.tagline}</td></tr>` : ""}
</table>
</td>
</tr>
</table>`
  }

  const handleTextareaClick = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    const textarea = e.target as HTMLTextAreaElement
    textarea.select()
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateHtmlSignature())
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  const InstagramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="inline-block"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="flex-shrink-0 flex flex-col w-80 bg-gray-100 dark:bg-gray-900 p-6">
        {/* Logo */}
        <svg
          width="139"
          height="24"
          viewBox="0 0 139 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-900 dark:text-gray-100"
        >
          <path
            d="M12.268 7.56328C12.2084 7.38462 12.0298 7.26551 11.7916 7.26551H2.56079C2.38213 7.26551 2.26303 7.1464 2.26303 6.96774V0.476426C2.26303 0.17866 2.02481 0 1.7866 0H0.476426C0.17866 0 0 0.238213 0 0.476426V23.4045C0 23.7022 0.238213 23.8809 0.476426 23.8809H11.1365C11.3151 23.8809 11.4938 23.7618 11.5533 23.6427L15.3052 17.1514C15.5434 16.7345 15.603 16.2581 15.4243 15.8412L12.3275 7.56328H12.268ZM12.6253 17.0323L10.2432 21.201C10.1241 21.4392 9.88586 21.5583 9.58809 21.5583H2.56079C2.38213 21.5583 2.26303 21.4392 2.26303 21.2605V9.88586C2.26303 9.70719 2.38213 9.58809 2.56079 9.58809H10.005C10.3027 9.58809 10.6005 9.76675 10.7196 10.0645L12.7444 15.5434C12.9231 16.0198 12.8635 16.6154 12.6253 17.0323Z"
            fill="currentColor"
          />
          <path
            d="M31.9801 7.44417C31.8015 7.26551 31.5633 7.20595 31.3251 7.20595H24.2382C24 7.20595 23.7618 7.32506 23.5831 7.50372L20.0099 11.3151C19.8313 11.4938 19.7717 11.732 19.7717 11.9702V19.1166C19.7717 19.3548 19.8313 19.5335 20.0099 19.7122L23.4045 23.5831C23.5831 23.7618 23.8213 23.8809 24.1191 23.8809H34.6005C34.8983 23.8809 35.0769 23.6427 35.0769 23.4045V10.8983C35.0769 10.66 34.9578 10.4218 34.7792 10.2432L31.9801 7.50372V7.44417ZM32.7543 21.201C32.7543 21.3797 32.6352 21.4988 32.4566 21.4988H25.2506C24.8933 21.4988 24.5955 21.3797 24.3573 21.0819L22.3325 18.7593C22.1538 18.5211 22.0347 18.2829 22.0347 17.9851V12.8635C22.0347 12.5658 22.1538 12.268 22.3325 12.0893L24.4764 9.8263C24.7146 9.58809 25.0124 9.46898 25.3102 9.46898H30.2531C30.5509 9.46898 30.8486 9.58809 31.0273 9.76675L32.3375 11.0174C32.5757 11.2556 32.6948 11.5533 32.6948 11.8511V21.1414L32.7543 21.201Z"
            fill="currentColor"
          />
          <path
            d="M68.7246 7.44417C68.5459 7.26551 68.3077 7.20595 68.0695 7.20595H61.1613C60.9231 7.20595 60.6849 7.32506 60.5062 7.50372L56.933 11.4342C56.8734 11.5534 56.8139 11.6725 56.8139 11.7916V17.9256C56.8139 18.1042 56.8139 18.2829 56.9926 18.4615L60.3871 23.464C60.5658 23.7022 60.8635 23.8809 61.1613 23.8809H72.1787C72.4764 23.8809 72.6551 23.6427 72.6551 23.4045V11.6129C72.6551 11.3747 72.536 11.1365 72.3573 10.9578L68.665 7.50372L68.7246 7.44417ZM70.3325 21.201C70.3325 21.3797 70.2134 21.4988 70.0347 21.4988H62.531C62.1737 21.4988 61.8164 21.3201 61.5782 20.9628L59.3151 17.6278C59.2556 17.5087 59.196 17.3896 59.196 17.2109V12.8635C59.196 12.5658 59.3151 12.3275 59.4938 12.0893L61.5186 9.8263C61.7568 9.58809 62.0546 9.46898 62.3524 9.46898H67.1166C67.4144 9.46898 67.7122 9.58809 67.8908 9.76675L70.0347 11.7916C70.273 12.0298 70.3921 12.3275 70.3921 12.6253V21.1414L70.3325 21.201Z"
            fill="currentColor"
          />
          <path
            d="M119.464 21.5583H110.412C110.233 21.5583 110.114 21.4392 110.114 21.2605L109.4 16.9131C109.4 16.794 109.4 16.7345 109.459 16.6749C109.519 16.6154 109.638 16.5558 109.697 16.5558H116.01C116.308 16.5558 116.486 16.3176 116.486 16.0794V14.7692C116.486 14.4715 116.248 14.2928 116.01 14.2928H109.638C109.519 14.2928 109.459 14.2928 109.4 14.1737C109.34 14.1141 109.28 13.995 109.34 13.9355L109.995 9.88586C109.995 9.70719 110.174 9.58809 110.293 9.58809H118.868C119.166 9.58809 119.345 9.34988 119.345 9.11166V7.80149C119.345 7.50372 119.107 7.32506 118.868 7.32506H108.804C108.328 7.32506 107.97 7.62283 107.911 8.09925L106.779 15.3648C106.779 15.4839 106.779 15.5434 106.779 15.6625L108.03 23.2258C108.089 23.6427 108.506 24 108.923 24H119.404C119.702 24 119.881 23.7618 119.881 23.5236V22.2134C119.881 21.9156 119.643 21.737 119.404 21.737L119.464 21.5583Z"
            fill="currentColor"
          />
          <path
            d="M102.015 21.5583H97.727C97.4293 21.5583 97.1911 21.4392 96.9529 21.2605L95.5236 19.9504C95.2854 19.7122 95.1663 19.4144 95.1663 19.1166V9.88586C95.1663 9.70719 95.2854 9.58809 95.464 9.58809H101.836C102.134 9.58809 102.313 9.34988 102.313 9.11166V7.80149C102.313 7.50372 102.074 7.32506 101.836 7.32506H95.464C95.2854 7.32506 95.1663 7.20595 95.1663 7.02729V2.50124C95.1663 2.20347 94.928 2.02481 94.6898 2.02481H93.3797C93.0819 2.02481 92.9032 2.26303 92.9032 2.50124V20.3672C92.9032 20.6055 93.0223 20.8437 93.201 21.0223L96.2382 23.7618C96.4169 23.9404 96.5955 24 96.8337 24H102.134C102.432 24 102.61 23.7618 102.61 23.5236V22.2134C102.61 21.9156 102.372 21.737 102.134 21.737L102.015 21.5583Z"
            fill="currentColor"
          />
          <path
            d="M88.4367 21.5583H80.8734C80.6948 21.5583 80.5757 21.4392 80.5757 21.2605V7.68238C80.5757 7.38461 80.3375 7.20595 80.0993 7.20595H78.7891C78.4913 7.20595 78.3127 7.44417 78.3127 7.68238V23.4045C78.3127 23.7022 78.5509 23.8809 78.7891 23.8809H88.4963C88.794 23.8809 88.9727 23.6427 88.9727 23.4045V22.0943C88.9727 21.7965 88.7345 21.6179 88.4963 21.6179L88.4367 21.5583Z"
            fill="currentColor"
          />
          <path
            d="M138.164 11.9107C138.283 11.732 138.342 11.5533 138.342 11.3747V7.68238C138.342 7.38461 138.104 7.20595 137.866 7.20595H136.556C136.258 7.20595 136.079 7.44417 136.079 7.68238V10.6005C136.079 10.8387 136.02 11.0769 135.901 11.2556L134.352 13.5186C134.114 13.8164 133.757 14.0546 133.4 14.0546H129.529C129.171 14.0546 128.814 13.8759 128.576 13.5186L127.027 11.2556C126.908 11.0769 126.849 10.8387 126.849 10.6005V7.68238C126.849 7.38461 126.61 7.20595 126.372 7.20595H125.062C124.764 7.20595 124.586 7.44417 124.586 7.68238V11.3747C124.586 11.5533 124.586 11.732 124.764 11.9107L126.61 14.6501C126.849 15.0074 126.849 15.4839 126.61 15.9007L124.705 19.1762C124.645 19.2953 124.586 19.4739 124.586 19.6526V23.2854C124.586 23.5831 124.824 23.7618 125.062 23.7618H126.372C126.67 23.7618 126.849 23.5236 126.849 23.2854V20.3672C126.849 20.1886 126.849 19.9504 127.027 19.7717L128.635 16.9727C128.814 16.6154 129.231 16.3772 129.648 16.3772H133.34C133.757 16.3772 134.114 16.6154 134.352 16.9727L135.96 19.7717C136.079 19.9504 136.139 20.129 136.139 20.3672V23.2854C136.139 23.5831 136.377 23.7618 136.615 23.7618H137.926C138.223 23.7618 138.402 23.5236 138.402 23.2854V19.6526C138.402 19.4739 138.402 19.3548 138.283 19.1762L136.377 15.9007C136.139 15.5434 136.199 15.067 136.377 14.6501L138.223 11.9107H138.164Z"
            fill="currentColor"
          />
          <path
            d="M52.3474 17.0918C52.2283 16.7345 52.0496 16.5558 52.0496 16.5558L51.5137 15.9007L50.799 15.1265C50.6799 15.0074 50.6204 14.9479 50.5012 14.8883C50.3226 14.7097 49.9653 14.6501 49.7271 14.5906L46.0347 14.1141L44.5459 13.9355L43.3548 13.7568C43.1762 13.7568 42.9975 13.6973 42.938 13.6377C42.8189 13.5186 42.6998 13.3995 42.6402 13.3399L42.4615 13.1017C42.402 12.9826 42.3424 12.804 42.3424 12.6849V10.7196C42.4615 10.4814 42.5211 10.3027 42.6402 10.1241C42.6402 10.1241 42.6998 10.005 42.7593 10.005L42.8784 9.88585C42.938 9.88585 43.0571 9.76674 43.1166 9.70719C43.2357 9.70719 43.4144 9.64764 43.5931 9.64764H43.8313L50.5608 9.58808C50.8586 9.58808 50.9777 9.34987 50.9777 9.23076V7.68237C50.9777 7.44416 50.799 7.32505 50.6204 7.32505H42.8189C42.8189 7.38461 42.5211 7.38461 42.2233 7.56327C42.1042 7.56327 42.0447 7.68238 41.9256 7.74193L40.7345 8.933C40.7345 8.933 40.4963 9.11165 40.3772 9.46897C40.3176 9.64763 40.2581 9.8263 40.2581 10.1241L40.139 13.3995C40.139 13.3995 40.139 13.4591 40.139 13.5186C40.139 13.5186 40.139 13.6377 40.139 13.6973C40.139 13.8164 40.1985 13.9355 40.2581 13.995L40.3772 14.1737V14.2332L41.3896 15.603C41.4491 15.6625 41.5682 15.7221 41.6278 15.7816C41.9256 15.9603 42.2233 16.0198 42.2233 16.0198L42.8784 16.1389L48.2382 16.8536H48.3573L48.8933 16.9727C48.9529 16.9727 49.072 16.9727 49.1315 17.0323C49.2506 17.0918 49.3102 17.1514 49.4293 17.2109L49.8462 17.6278C50.0248 17.866 50.1439 18.1042 50.1439 18.402V20.3077C50.1439 20.4268 50.1439 20.6055 50.0248 20.7246L49.7271 21.201C49.6675 21.2605 49.5484 21.4392 49.3697 21.4988C49.2506 21.5583 49.072 21.6179 48.8933 21.6179H40.9132C40.6154 21.6179 40.4963 21.737 40.4963 22.0347V23.5236C40.4963 23.8213 40.6154 23.9404 40.9132 23.9404H48.1191L49.8462 23.8809C49.8462 23.8809 50.1439 23.8809 50.4417 23.7022C50.6204 23.6427 50.7395 23.5236 50.8586 23.3449L52.1092 21.6774C52.1092 21.6774 52.2878 21.4392 52.407 21.0819C52.407 21.0819 52.407 21.0223 52.407 20.9628C52.407 20.9628 52.407 20.9032 52.407 20.8437V17.6278C52.407 17.3896 52.407 17.2705 52.3474 17.0918Z"
            fill="currentColor"
          />
        </svg>

        {/* Subtitle */}
        <div className="text-gray-500 dark:text-gray-400 text-xs tracking-wider mt-2 uppercase">
          HTML email signature generator
        </div>

        {/* Form */}
        <div className="mt-6 flex-1 space-y-4">
          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">FULL NAME</label>
            <input
              type="text"
              value={signatureData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">TITLE/ROLE</label>
            <input
              type="text"
              value={signatureData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter your job title"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">PHONE</label>
            <input
              type="text"
              value={signatureData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">EMAIL</label>
            <input
              type="text"
              value={signatureData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="youremail@basaltex.com.mx"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">WEBSITE</label>
            <input
              type="text"
              value={signatureData.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="Enter your website URL"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">INSTAGRAM HANDLE</label>
            <input
              type="text"
              value={signatureData.instagram}
              onChange={(e) => handleInputChange("instagram", e.target.value)}
              placeholder="Instagram handle (without @)"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>

          <div>
            <label className="block text-gray-500 dark:text-gray-400 text-xs uppercase mb-1">BRAND TAGLINE</label>
            <input
              type="text"
              value={signatureData.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              placeholder="Enter your brand tagline"
              className="w-full h-10 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm px-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
            />
          </div>
        </div>

        {/* Export Button */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <button className="sticky bottom-6 w-full h-10 bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-900 text-sm font-medium cursor-pointer border-0 rounded-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
              Export HTML
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl min-h-[80vh] flex flex-col border-gray-200 dark:border-gray-800">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between text-gray-900 dark:text-gray-100">
                HTML Signature Code
                <Button onClick={copyToClipboard} variant="outline" size="sm" className="ml-4">
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy HTML
                    </>
                  )}
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 flex flex-col space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Copy the HTML code below and paste it into your email client's signature settings.
              </p>
              <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-auto border border-gray-200 dark:border-gray-800">
                <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-gray-900 dark:text-gray-100">
                  {generateHtmlSignature()}
                </pre>
              </div>
              <Textarea
                value={generateHtmlSignature()}
                readOnly
                onClick={handleTextareaClick}
                className="sr-only"
                placeholder="HTML signature code will appear here..."
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Right Panel - Email Mockup */}
      <div className="flex-grow bg-gray-200 dark:bg-gray-800 flex items-center justify-center p-8 relative">
        {/* Theme Switcher */}
        <div className="absolute bottom-6 right-6">
          <div className="bg-gray-300 dark:bg-gray-600 rounded-full p-1 flex items-center space-x-1">
            <button
              onClick={() => setTheme("light")}
              className={`p-2 rounded-full transition-all duration-200 ${
                theme === "light"
                  ? "bg-white shadow-md text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              title="Light theme"
            >
              <Sun className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`p-2 rounded-full transition-all duration-200 ${
                theme === "dark"
                  ? "bg-white shadow-md text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              title="Dark theme"
            >
              <Moon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`p-2 rounded-full transition-all duration-200 ${
                theme === "system"
                  ? "bg-white shadow-md text-gray-900"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
              title="System theme"
            >
              <Monitor className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Email Mockup */}
        <div
          className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-300 dark:border-gray-700"
          style={{ minHeight: "600px" }}
        >
          {/* Email Header */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div className="mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">From:</span>{" "}
                {signatureData.email || "cdelcastillo@basaltex.com.mx"}
              </div>
              <div className="mb-1">
                <span className="font-medium text-gray-700 dark:text-gray-300">To:</span> cliente@company.com
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Subject:</span> Propuesta de proyecto - Basaltex
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="p-6 text-gray-800 dark:text-gray-200 leading-relaxed">
            <p className="mb-4">Estimado Cliente,</p>

            <p className="mb-4">
              Me da mucho gusto saludarle y poder presentar nuestra propuesta para el proyecto que nos ha compartido. En Basaltex nos especializamos en proyectos de construcción sustentable y desarrollo urbano, con más de 15 años de experiencia en el mercado.
            </p>

            <p className="mb-4">Nuestra propuesta incluye:</p>

            <ul className="mb-4 ml-6 space-y-1">
              <li>• Análisis completo del terreno y factibilidad técnica</li>
              <li>• Diseño arquitectónico y estructural personalizado</li>
              <li>• Gestión de permisos y licencias necesarias</li>
              <li>• Supervisión técnica durante todo el proceso</li>
              <li>• Garantía de calidad y cumplimiento de normativas</li>
            </ul>

            <p className="mb-4">
              Para mostrarle todos sus ventajas, le invitamos a nuestro webinar el próximo "martes 15 de junio a las 10:00h", donde repasaremos:
            </p>

            <ul className="mb-4 ml-6 space-y-1">
              <li>• Propiedades técnicas y aplicaciones prácticas</li>
              <li>• Casos de éxito en proyectos residenciales y comerciales</li>
              <li>• Guía de dosificación y soporte técnico post-venta</li>
            </ul>

            <p className="mb-6">
              Confirme su asistencia respondiendo a este correo o contactando a nuestro equipo de atención al cliente.
            </p>

            <p className="mb-6">
              Gracias por su confianza. En Basaltex seguimos innovando para construir un futuro más sostenible.
            </p>

            {/* Live Signature Preview */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "currentColor",
                }}
              >
                <table cellPadding="0" cellSpacing="0" style={{ borderCollapse: "collapse" }}>
                  <tbody>
                    <tr>
                      <td style={{ verticalAlign: "top", paddingRight: "0px" }}>
                        <svg
                          width="27"
                          height="41"
                          viewBox="0 0 27 41"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ width: "48px", height: "48px", display: "block" }}
                        >
                          <path
                            d="M21.3031 13.3992C21.2031 13.0992 20.9031 12.8992 20.5031 12.8992H5.00312C4.70312 12.8992 4.50312 12.6992 4.50312 12.3992V1.49922C4.50312 0.999218 4.10313 0.699219 3.70312 0.699219H1.50312C1.00312 0.699219 0.703125 1.09922 0.703125 1.49922V39.9992C0.703125 40.4992 1.10312 40.7992 1.50312 40.7992H19.4031C19.7031 40.7992 20.0031 40.5992 20.1031 40.3992L26.4031 29.4992C26.8031 28.7992 26.9031 27.9992 26.6031 27.2992L21.4031 13.3992H21.3031ZM21.9031 29.2992L17.9031 36.2992C17.7031 36.6992 17.3031 36.8992 16.8031 36.8992H5.00312C4.70312 36.8992 4.50312 36.6992 4.50312 36.3992V17.2992C4.50312 16.9992 4.70312 16.7992 5.00312 16.7992H17.5031C18.0031 16.7992 18.5031 17.0992 18.7031 17.5992L22.1031 26.7992C22.4031 27.5992 22.3031 28.5992 21.9031 29.2992Z"
                            fill="currentColor"
                          />
                        </svg>
                      </td>
                      <td style={{ verticalAlign: "top", paddingTop: "20px", paddingLeft: "20px" }}>
                        <div style={{ fontWeight: "bold", margin: "0", padding: "0 0 1px 0", fontSize: "16px" }}>
                          {signatureData.fullName || (
                            <span style={{ color: "currentColor", opacity: 0.4 }}>Full Name</span>
                          )}
                        </div>
                        <div
                          style={{
                            margin: "0",
                            padding: "0 0 1px 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "currentColor",
                            opacity: signatureData.title ? 0.6 : 0.4,
                          }}
                        >
                          {signatureData.title || "Job Title"}
                        </div>
                        <div
                          style={{
                            margin: "0",
                            padding: "0 0 1px 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "currentColor",
                            opacity: signatureData.phone ? 0.6 : 0.4,
                          }}
                        >
                          tel.: {signatureData.phone || "Phone Number"}
                        </div>
                        <div
                          style={{
                            margin: "0",
                            padding: "0 0 18px 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "currentColor",
                            opacity: signatureData.email ? 0.6 : 0.4,
                          }}
                        >
                          mail:{" "}
                          {signatureData.email ? (
                            <a
                              href={`mailto:${signatureData.email}`}
                              style={{
                                color: "currentColor",
                                textDecoration: "none",
                                fontWeight: "bold",
                              }}
                            >
                              {signatureData.email}
                            </a>
                          ) : (
                            "Email Address"
                          )}
                        </div>
                        <div style={{ margin: "0", padding: "0 0 1px 0", fontSize: "15px", fontWeight: "bold" }}>
                          {signatureData.website ? (
                            <a
                              href={`https://${signatureData.website}`}
                              style={{ color: "currentColor", textDecoration: "none", fontWeight: "bold" }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {signatureData.website}
                            </a>
                          ) : (
                            <span style={{ color: "currentColor", opacity: 0.4 }}>Website</span>
                          )}
                        </div>
                        <div style={{ margin: "0", padding: "0 0 40px 0", fontSize: "15px", fontWeight: "bold" }}>
                          {signatureData.instagram ? (
                            <a
                              href={`https://instagram.com/${signatureData.instagram}`}
                              style={{ color: "currentColor", textDecoration: "none", fontWeight: "bold" }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <InstagramIcon />
                            </a>
                          ) : (
                            <span style={{ color: "currentColor", opacity: 0.4 }}>
                              <InstagramIcon />
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            margin: "0",
                            padding: "16px 0 0 0",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "currentColor",
                            opacity: signatureData.tagline ? 0.6 : 0.4,
                          }}
                        >
                          // {signatureData.tagline || "Brand Tagline"}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
