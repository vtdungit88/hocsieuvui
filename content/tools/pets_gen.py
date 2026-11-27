# Sinh nghệ thuật thú cưng (SVG tĩnh, hệ toạ độ 100x100, mặt đất y=94)
import json, re, os
U='__UID__'
def sh(tag, attrs, fill, extra=''):
    return f'<{tag} {attrs} fill="{fill}" {extra}/><{tag} {attrs} fill="url(#petShade_{U})" {extra}/>'
def eye(cx,cy,r=4.4,iris='#5B3A1E',slit=False):
    pup = f'<ellipse cx="{cx}" cy="{cy}" rx="{r*0.22:.2f}" ry="{r*0.8:.2f}" fill="#000"/>' if slit else f'<circle cx="{cx}" cy="{cy}" r="{r*0.46:.2f}" fill="#000"/>'
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="{r}" ry="{r*1.08:.2f}" fill="#0B0F1A"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r*0.82:.2f}" fill="{iris}"/><circle cx="{cx}" cy="{cy+r*0.25:.2f}" r="{r*0.55:.2f}" fill="#fff" opacity="0.14"/>'
            f'{pup}<circle cx="{cx-r*0.32:.2f}" cy="{cy-r*0.36:.2f}" r="{r*0.3:.2f}" fill="#fff"/><circle cx="{cx+r*0.34:.2f}" cy="{cy+r*0.34:.2f}" r="{r*0.14:.2f}" fill="#fff" opacity="0.85"/>')
def shadow(rx=34): return f'<ellipse cx="50" cy="94" rx="{rx}" ry="6" fill="#0F172A" opacity="0.2"/>'
def whisk(x,y,d):  # d=-1 left, 1 right
    return ''.join(f'<path d="M{x} {y+i*2} q{d*10} {i*3-3} {d*19} {i*5-4}" stroke="#fff" stroke-opacity=".85" stroke-width=".9" fill="none" stroke-linecap="round"/>' for i in (-1,0,1))

DEFS=f'''<radialGradient id="petShade_{U}" cx="36%" cy="26%" r="82%"><stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#1b0f06" stop-opacity=".34"/></radialGradient>
<linearGradient id="petMetal_{U}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF7D1"/><stop offset=".45" stop-color="#F7C948"/><stop offset="1" stop-color="#B7791F"/></linearGradient>
<linearGradient id="petFire_{U}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDE047"/><stop offset=".5" stop-color="#F97316"/><stop offset="1" stop-color="#DC2626"/></linearGradient>
<filter id="petFur_{U}" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" result="n"/>
<feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" xChannelSelector="R" yChannelSelector="G" result="d"/>
<feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 -0.35" result="na"/>
<feComposite in="d" in2="na" operator="arithmetic" k1="-0.0" k2="1" k3="0" k4="0" result="d2"/>
<feColorMatrix in="n" type="matrix" values="0.9 0 0 0 0.1  0.9 0 0 0 0.1  0.9 0 0 0 0.1  0 0 0 0 1" result="g"/>
<feComposite in="d" in2="g" operator="arithmetic" k1="0.28" k2="0.82" k3="0" k4="0" result="tx"/>
<feComposite in="tx" in2="d" operator="in" result="txin"/>
<feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="h"/>
<feSpecularLighting in="h" surfaceScale="4" specularConstant="0.3" specularExponent="26" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="55"/></feSpecularLighting>
<feComposite in="sp" in2="d" operator="in" result="spin"/>
<feBlend in="spin" in2="txin" mode="screen"/></filter>'''

DEFS+=f'''<filter id="petSmooth_{U}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="2" result="h"/><feSpecularLighting in="h" surfaceScale="4" specularConstant="0.45" specularExponent="22" lighting-color="#fff" result="sp"><feDistantLight azimuth="235" elevation="55"/></feSpecularLighting><feComposite in="sp" in2="SourceAlpha" operator="in" result="spin"/><feBlend in="spin" in2="SourceGraphic" mode="screen"/></filter>'''
ART={}

# ---------- CORGI ----------
c=shadow()+'<ellipse cx="77" cy="78" rx="5.5" ry="4.5" fill="#E8832A"/>'
c+=sh('ellipse','cx="31" cy="82" rx="12" ry="11"','#D9731C')+sh('ellipse','cx="69" cy="82" rx="12" ry="11"','#D9731C')
c+=sh('ellipse','cx="50" cy="72" rx="26" ry="22"','#E8832A')+sh('ellipse','cx="50" cy="79" rx="15" ry="15"','#FFFFFF')
c+=sh('rect','x="36" y="80" width="11" height="14" rx="5.5"','#FFFFFF')+sh('rect','x="53" y="80" width="11" height="14" rx="5.5"','#FFFFFF')
c+='<path d="M31 60 Q50 71 69 60" stroke="#DC2626" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="67" r="3.4" fill="#FACC15"/>'
c+='<path d="M30 30 L25 3 L45 20Z" fill="#E8832A"/><path d="M32 26 L29 10 L41 20Z" fill="#F9B4B4"/><path d="M70 30 L75 3 L55 20Z" fill="#E8832A"/><path d="M68 26 L71 10 L59 20Z" fill="#F9B4B4"/>'
c+=sh('circle','cx="50" cy="40" r="22"','#F29A3F')
c+=sh('path','d="M50 19 Q42 34 34 47 Q50 64 66 47 Q58 34 50 19Z"','#FFF8F0')
c+=eye(39,37,4.6,'#4A2A12')+eye(61,37,4.6,'#4A2A12')
c+='<ellipse cx="50" cy="46" rx="5" ry="3.5" fill="#15110F"/><ellipse cx="48.6" cy="44.8" rx="1.8" ry="1" fill="#fff" opacity=".7"/>'
c+='<path d="M50 49.5 Q50 54 44.5 54 M50 49.5 Q50 54 55.5 54" stroke="#4A1F1F" stroke-width="1.5" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="57" rx="3.8" ry="4.6" fill="#F472B6"/><path d="M50 53.5 L50 60" stroke="#BE185D" stroke-width=".8"/>'
c+='<ellipse cx="33" cy="46" rx="4" ry="2.4" fill="#FB7185" opacity=".35"/><ellipse cx="67" cy="46" rx="4" ry="2.4" fill="#FB7185" opacity=".35"/>'
ART['pet_corgi']=c

# ---------- CAT ----------
c=shadow(30)+'<path d="M70 86 Q94 86 90 60 Q88 46 80 50" stroke="#9AA3AE" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M89 62 Q88 52 82 50" stroke="#5E6671" stroke-width="8" fill="none" stroke-linecap="round" opacity=".55"/>'
c+=sh('ellipse','cx="50" cy="72" rx="22" ry="22"','#9AA3AE')
c+='<path d="M32 62 q6 2 8 8 M32 72 q6 1 8 6 M68 62 q-6 2 -8 8 M68 72 q-6 1 -8 6" stroke="#5E6671" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".7"/>'
c+=sh('ellipse','cx="50" cy="78" rx="11" ry="14"','#F7F7F7')
c+=sh('rect','x="39" y="82" width="9" height="12" rx="4.5"','#FFFFFF')+sh('rect','x="52" y="82" width="9" height="12" rx="4.5"','#FFFFFF')
c+='<path d="M30 30 L27 5 L46 19Z" fill="#9AA3AE"/><path d="M33 26 L31 11 L42 19Z" fill="#F9A8C0"/><path d="M70 30 L73 5 L54 19Z" fill="#9AA3AE"/><path d="M67 26 L69 11 L58 19Z" fill="#F9A8C0"/>'
c+=sh('circle','cx="50" cy="38" r="21"','#A9B2BD')
c+='<path d="M50 18 L50 27 M43 19 L44.5 26 M57 19 L55.5 26" stroke="#5E6671" stroke-width="2.2" stroke-linecap="round"/>'
c+=sh('ellipse','cx="50" cy="46" rx="10" ry="6.5"','#F7F7F7')
c+=eye(40,37,4.8,'#8BC34A',True)+eye(60,37,4.8,'#8BC34A',True)
c+='<path d="M47 43 L53 43 L50 47Z" fill="#F472B6"/><path d="M50 47 Q50 51 46 51 M50 47 Q50 51 54 51" stroke="#5B3A3A" stroke-width="1.2" fill="none" stroke-linecap="round"/>'
c+=whisk(41,46,-1)+whisk(59,46,1)
ART['pet_cat']=c

# ---------- PANDA ----------
c=shadow()
c+=sh('ellipse','cx="31" cy="84" rx="11" ry="11"','#1B1B1F')+sh('ellipse','cx="69" cy="84" rx="11" ry="11"','#1B1B1F')
c+=sh('ellipse','cx="50" cy="72" rx="26" ry="22"','#FAFAFA')
c+=sh('ellipse','cx="27" cy="68" rx="9" ry="16" transform="rotate(14 27 68)"','#1B1B1F')+sh('ellipse','cx="73" cy="68" rx="9" ry="16" transform="rotate(-14 73 68)"','#1B1B1F')
c+='<rect x="61" y="56" width="5.5" height="34" rx="2.5" fill="#7CB342"/><rect x="61" y="66" width="5.5" height="1.8" fill="#4E8A1F"/><rect x="61" y="78" width="5.5" height="1.8" fill="#4E8A1F"/><path d="M66 60 Q76 52 80 58 Q72 62 66 60Z" fill="#8BC34A"/>'
c+=sh('circle','cx="31" cy="19" r="9"','#1B1B1F')+sh('circle','cx="69" cy="19" r="9"','#1B1B1F')+'<circle cx="31" cy="20" r="4" fill="#4B4B55"/><circle cx="69" cy="20" r="4" fill="#4B4B55"/>'
c+=sh('circle','cx="50" cy="38" r="23"','#FFFFFF')
c+=sh('ellipse','cx="39" cy="37" rx="7.5" ry="9.5" transform="rotate(-22 39 37)"','#1B1B1F')+sh('ellipse','cx="61" cy="37" rx="7.5" ry="9.5" transform="rotate(22 61 37)"','#1B1B1F')
c+='<circle cx="39.5" cy="36.5" r="3.8" fill="#fff"/><circle cx="60.5" cy="36.5" r="3.8" fill="#fff"/><circle cx="40" cy="37" r="2.3" fill="#0B0F1A"/><circle cx="60" cy="37" r="2.3" fill="#0B0F1A"/><circle cx="39.2" cy="36" r="0.9" fill="#fff"/><circle cx="59.2" cy="36" r="0.9" fill="#fff"/>'
c+='<ellipse cx="50" cy="47" rx="4.6" ry="3.2" fill="#15110F"/><ellipse cx="48.8" cy="46" rx="1.6" ry=".9" fill="#fff" opacity=".6"/><path d="M50 50 Q50 54.5 45 54.5 M50 50 Q50 54.5 55 54.5" stroke="#15110F" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
ART['pet_panda']=c

# ---------- BUNNY ----------
c=shadow(30)+'<circle cx="75" cy="82" r="7.5" fill="#FFFFFF"/><circle cx="73" cy="80" r="3" fill="#fff" opacity=".6"/>'
c+=sh('ellipse','cx="38" cy="18" rx="7.5" ry="21" transform="rotate(-9 38 18)"','#F6F1EC')+'<ellipse cx="38" cy="19" rx="3.8" ry="15" transform="rotate(-9 38 19)" fill="#F9B4CB"/>'
c+=sh('ellipse','cx="63" cy="16" rx="7.5" ry="21" transform="rotate(10 63 16)"','#F6F1EC')+'<ellipse cx="63" cy="17" rx="3.8" ry="15" transform="rotate(10 63 17)" fill="#F9B4CB"/>'
c+=sh('ellipse','cx="50" cy="76" rx="21" ry="19"','#FBF7F2')+sh('ellipse','cx="50" cy="80" rx="12" ry="13"','#FFFFFF')
c+=sh('ellipse','cx="40" cy="91" rx="8" ry="4.5"','#FBF7F2')+sh('ellipse','cx="60" cy="91" rx="8" ry="4.5"','#FBF7F2')
c+=sh('circle','cx="50" cy="45" r="19"','#FBF7F2')
c+=eye(41,43,4.2,'#6B3E1E')+eye(59,43,4.2,'#6B3E1E')
c+='<ellipse cx="50" cy="51" rx="3" ry="2.2" fill="#F472B6"/><path d="M50 53 Q50 57 46 57 M50 53 Q50 57 54 57" stroke="#9D5B6C" stroke-width="1.2" fill="none" stroke-linecap="round"/><rect x="47.6" y="56" width="2.2" height="4" rx="1" fill="#fff" stroke="#E5D9D0" stroke-width=".4"/><rect x="50.2" y="56" width="2.2" height="4" rx="1" fill="#fff" stroke="#E5D9D0" stroke-width=".4"/>'
c+='<ellipse cx="35" cy="51" rx="4" ry="2.6" fill="#FB7185" opacity=".35"/><ellipse cx="65" cy="51" rx="4" ry="2.6" fill="#FB7185" opacity=".35"/>'+whisk(42,52,-1)+whisk(58,52,1)
c+='<path d="M58 70 L70 76 L60 82Z" fill="#F97316"/><path d="M58 70 Q54 64 58 62 M58 70 Q60 63 64 64" stroke="#65A30D" stroke-width="2" fill="none" stroke-linecap="round"/>'
ART['pet_bunny']=c

# ---------- FOX ----------
c=shadow()+'<ellipse cx="82" cy="64" rx="10" ry="24" transform="rotate(28 82 64)" fill="#E8661A"/><ellipse cx="82" cy="64" rx="10" ry="24" transform="rotate(28 82 64)" fill="url(#petShade_'+U+')"/><ellipse cx="91" cy="43" rx="6.5" ry="8.5" transform="rotate(28 91 43)" fill="#FFF8F0"/>'
c+=sh('rect','x="38" y="84" width="9" height="10" rx="4"','#2B1D14')+sh('rect','x="53" y="84" width="9" height="10" rx="4"','#2B1D14')
c+=sh('ellipse','cx="50" cy="73" rx="21" ry="20"','#E8661A')+sh('ellipse','cx="50" cy="78" rx="11" ry="14"','#FFF8F0')
c+='<path d="M29 32 L24 3 L46 20Z" fill="#E8661A"/><path d="M32 28 L29 10 L42 20Z" fill="#3B2314"/><path d="M71 32 L76 3 L54 20Z" fill="#E8661A"/><path d="M68 28 L71 10 L58 20Z" fill="#3B2314"/>'
c+=sh('path','d="M27 40 Q27 20 50 20 Q73 20 73 40 Q73 52 50 64 Q27 52 27 40Z"','#F07A22')
c+=sh('path','d="M27 41 Q40 47 50 64 Q36 58 29 50Z"','#FFF8F0')+sh('path','d="M73 41 Q60 47 50 64 Q64 58 71 50Z"','#FFF8F0')
c+=eye(39,38,4.2,'#D98A1C')+eye(61,38,4.2,'#D98A1C')+'<path d="M33 33 Q39 30 44 33 M67 33 Q61 30 56 33" stroke="#3B2314" stroke-width="1.5" fill="none" stroke-linecap="round"/>'
c+='<ellipse cx="50" cy="57" rx="4.2" ry="3" fill="#15110F"/><ellipse cx="48.8" cy="56" rx="1.4" ry=".8" fill="#fff" opacity=".6"/><path d="M50 60 Q50 63 46 63 M50 60 Q50 63 54 63" stroke="#3B2314" stroke-width="1.2" fill="none" stroke-linecap="round"/>'
ART['pet_fox']=c

# ---------- OWL ----------
c=shadow(28)+'<ellipse cx="42" cy="92" rx="6" ry="2.8" fill="#F59E0B"/><ellipse cx="58" cy="92" rx="6" ry="2.8" fill="#F59E0B"/>'
c+=sh('ellipse','cx="50" cy="62" rx="25" ry="30"','#8B5A2B')
c+=sh('ellipse','cx="26" cy="64" rx="8.5" ry="21" transform="rotate(8 26 64)"','#6F4420')+sh('ellipse','cx="74" cy="64" rx="8.5" ry="21" transform="rotate(-8 74 64)"','#6F4420')
c+=sh('ellipse','cx="50" cy="69" rx="16.5" ry="22"','#F6E3BE')
c+=''.join(f'<path d="M{x} {y} q3 4 6 0" stroke="#C9A36B" stroke-width="1.3" fill="none" stroke-linecap="round"/>' for x,y in [(41,58),(50,58),(45,65),(54,65),(41,72),(50,72),(45,79),(54,79),(47,86)])
c+=sh('ellipse','cx="50" cy="35" rx="24" ry="20"','#9A6532')
c+='<path d="M29 24 L25 6 L40 17Z" fill="#6F4420"/><path d="M71 24 L75 6 L60 17Z" fill="#6F4420"/>'
c+='<circle cx="39" cy="36" r="12.5" fill="#F8E8C8"/><circle cx="61" cy="36" r="12.5" fill="#F8E8C8"/><circle cx="39" cy="36" r="12.5" fill="url(#petShade_'+U+')"/><circle cx="61" cy="36" r="12.5" fill="url(#petShade_'+U+')"/>'
c+=eye(39,36,7,'#F5A623')+eye(61,36,7,'#F5A623')
c+='<path d="M46 42 L54 42 L50 51Z" fill="#F59E0B"/><path d="M46 42 L54 42 L50 46Z" fill="#FDBA45"/>'
c+='<path d="M28 20 L50 8 L72 20 L50 29Z" fill="#1E3A8A"/><path d="M28 20 L50 29 L50 31 L28 22Z" fill="#172B6B"/><path d="M72 20 L72 30" stroke="#FACC15" stroke-width="1.8"/><circle cx="72" cy="32" r="2.4" fill="#FACC15"/>'
ART['pet_owl']=c

# ---------- UNICORN ----------
c=shadow()+'<path d="M72 78 Q96 82 92 98 Q84 88 70 90Z" fill="#A78BFA"/><path d="M72 78 Q92 76 90 92" stroke="#38BDF8" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M72 78 Q95 70 96 86" stroke="#F472B6" stroke-width="3.4" fill="none" stroke-linecap="round"/>'
c+=sh('rect','x="36" y="80" width="10" height="14" rx="4.5"','#FFFFFF')+sh('rect','x="54" y="80" width="10" height="14" rx="4.5"','#FFFFFF')+'<rect x="36" y="90" width="10" height="4" rx="2" fill="#FACC15"/><rect x="54" y="90" width="10" height="4" rx="2" fill="#FACC15"/>'
c+=sh('ellipse','cx="50" cy="72" rx="25" ry="19"','#FFFFFF')
c+='<path d="M28 44 Q16 50 22 70 Q24 56 32 52Z" fill="#F472B6"/><path d="M30 40 Q12 40 14 62 Q20 46 33 46Z" fill="#A78BFA"/><path d="M72 44 Q84 50 78 70 Q76 56 68 52Z" fill="#38BDF8"/><path d="M70 40 Q88 40 86 62 Q80 46 67 46Z" fill="#A78BFA"/>'
c+='<path d="M34 28 L30 6 L47 20Z" fill="#fff"/><path d="M36 25 L33 11 L44 20Z" fill="#F9C6D9"/><path d="M66 28 L70 6 L53 20Z" fill="#fff"/><path d="M64 25 L67 11 L56 20Z" fill="#F9C6D9"/>'
c+=sh('circle','cx="50" cy="40" r="21"','#FFFFFF')
c+='<path d="M45 22 L50 -4 L55 22Z" fill="url(#petMetal_'+U+')"/><path d="M46 17 L54 15 M47 11 L53 9 M48 6 L52 4" stroke="#B7791F" stroke-width="1.2"/>'
c+='<path d="M30 24 Q40 14 50 22 Q60 14 70 24 Q62 22 50 28 Q38 22 30 24Z" fill="#F472B6"/><path d="M32 28 Q42 22 50 30 Q58 22 68 28 Q60 28 50 34 Q40 28 32 28Z" fill="#A78BFA" opacity=".9"/>'
c+=eye(40,40,4.8,'#7C3AED')+eye(60,40,4.8,'#7C3AED')+'<path d="M35 36 l-3 -2 M36 34 l-2 -3 M65 36 l3 -2 M64 34 l2 -3" stroke="#0B0F1A" stroke-width="1.1" stroke-linecap="round"/>'
c+='<ellipse cx="50" cy="52" rx="9" ry="6.5" fill="#FDE6EE"/><ellipse cx="46.5" cy="52" rx="1.2" ry="1.6" fill="#B8658A"/><ellipse cx="53.5" cy="52" rx="1.2" ry="1.6" fill="#B8658A"/><path d="M46 56 Q50 59 54 56" stroke="#B8658A" stroke-width="1.1" fill="none" stroke-linecap="round"/>'
c+='<ellipse cx="33" cy="48" rx="4" ry="2.4" fill="#FB7185" opacity=".35"/><ellipse cx="67" cy="48" rx="4" ry="2.4" fill="#FB7185" opacity=".35"/>'
ART['pet_unicorn']=c

# ---------- DRAGON ----------
c=shadow()+'<path d="M70 84 Q98 86 94 62 Q92 54 86 56" stroke="#D9382B" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M84 52 L90 46 L90 56Z" fill="#FDE68A"/>'
c+='<path d="M30 62 Q2 42 8 78 Q18 66 24 80Z" fill="#B91C1C"/><path d="M30 62 Q10 56 10 72 M30 66 Q14 66 16 76" stroke="#7F1D1D" stroke-width="1.2" fill="none"/><path d="M70 62 Q98 42 92 78 Q82 66 76 80Z" fill="#B91C1C"/><path d="M70 62 Q90 56 90 72 M70 66 Q86 66 84 76" stroke="#7F1D1D" stroke-width="1.2" fill="none"/>'
c+=sh('rect','x="36" y="82" width="11" height="12" rx="5"','#E5483A')+sh('rect','x="53" y="82" width="11" height="12" rx="5"','#E5483A')+'<path d="M38 93 l0 3 M42 93 l0 3 M46 93 l0 3 M55 93 l0 3 M59 93 l0 3 M63 93 l0 3" stroke="#FDE68A" stroke-width="1.6" stroke-linecap="round"/>'
c+=sh('ellipse','cx="50" cy="72" rx="23" ry="21"','#E5483A')+sh('ellipse','cx="50" cy="76" rx="13" ry="16"','#FDE68A')+''.join(f'<path d="M38 {y} Q50 {y+4} 62 {y}" stroke="#E7C65A" stroke-width="1.2" fill="none"/>' for y in (68,74,80,86))
c+='<path d="M36 26 L30 6 L46 20Z" fill="#FDE68A"/><path d="M64 26 L70 6 L54 20Z" fill="#FDE68A"/><path d="M44 21 L50 12 L56 21Z" fill="#FDE68A"/>'
c+=sh('circle','cx="50" cy="40" r="20"','#EF5B49')+sh('ellipse','cx="50" cy="50" rx="12" ry="9"','#F5806F')
c+=eye(40,37,4.8,'#FACC15',True)+eye(60,37,4.8,'#FACC15',True)+'<path d="M33 31 L44 34 M67 31 L56 34" stroke="#7F1D1D" stroke-width="1.6" stroke-linecap="round"/>'
c+='<ellipse cx="46" cy="49" rx="1.5" ry="1.1" fill="#7F1D1D"/><ellipse cx="54" cy="49" rx="1.5" ry="1.1" fill="#7F1D1D"/><path d="M42 54 Q50 59 58 54" stroke="#7F1D1D" stroke-width="1.3" fill="none" stroke-linecap="round"/><path d="M45 55 l1.4 3 l1.4 -3 M53 55 l1.4 3 l1.4 -3" fill="#fff"/>'
ART['pet_dragon']=c

# ---------- MECHA LION ----------
c=shadow()
c+=sh('rect','x="30" y="62" width="40" height="26" rx="10"','url(#petMetal_'+U+')')
c+=sh('rect','x="33" y="82" width="13" height="12" rx="4"','#94A3B8')+sh('rect','x="54" y="82" width="13" height="12" rx="4"','#94A3B8')
c+='<path d="M70 78 Q92 78 90 56" stroke="#94A3B8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M86 50 L94 58 L86 62Z" fill="#22D3EE"/>'
c+=''.join(f'<polygon points="50,{8} 56,22 44,22" transform="rotate({a} 50 40)" fill="#D97706"/>' for a in range(0,360,30))
c+=''.join(f'<polygon points="50,{14} 55,26 45,26" transform="rotate({a+15} 50 40)" fill="#F59E0B"/>' for a in range(0,360,30))
c+=sh('circle','cx="50" cy="40" r="19"','url(#petMetal_'+U+')')+'<path d="M32 40 Q50 52 68 40" stroke="#B7791F" stroke-width="1.4" fill="none"/>'
c+='<path d="M34 30 L44 26 L44 34Z M66 30 L56 26 L56 34Z" fill="#B7791F"/><rect x="32" y="33" width="36" height="9" rx="4.5" fill="#0F172A"/><rect x="36" y="35" width="10" height="5" rx="2.5" fill="#22D3EE"/><rect x="54" y="35" width="10" height="5" rx="2.5" fill="#22D3EE"/><rect x="37" y="36" width="4" height="1.6" rx=".8" fill="#fff" opacity=".8"/><rect x="55" y="36" width="4" height="1.6" rx=".8" fill="#fff" opacity=".8"/>'
c+='<path d="M46 47 L54 47 L50 52Z" fill="#7C2D12"/><rect x="44" y="53" width="12" height="3" rx="1.5" fill="#0F172A"/><circle cx="40" cy="74" r="3" fill="#EF4444"/><circle cx="50" cy="74" r="3" fill="#22D3EE"/><circle cx="60" cy="74" r="3" fill="#FACC15"/>'
ART['pet_mecha_lion']=c

# ---------- PHOENIX ----------
c=shadow(26)+'<path d="M46 70 Q30 94 24 98 Q40 90 50 80Z" fill="#F97316"/><path d="M54 70 Q70 94 76 98 Q60 90 50 80Z" fill="#DC2626"/><path d="M50 74 Q50 98 50 100 Q54 90 54 76Z" fill="#FDE047"/>'
c+='<path d="M34 54 Q2 36 6 14 Q22 22 28 34 Q14 18 18 6 Q36 20 38 40Z" fill="url(#petFire_'+U+')"/><path d="M66 54 Q98 36 94 14 Q78 22 72 34 Q86 18 82 6 Q64 20 62 40Z" fill="url(#petFire_'+U+')"/>'
c+=sh('ellipse','cx="50" cy="62" rx="19" ry="25"','#EF4444')+sh('ellipse','cx="50" cy="66" rx="11" ry="18"','#FDBA45')
c+=''.join(f'<path d="M{x} {y} q4 5 8 0" stroke="#F59E0B" stroke-width="1.2" fill="none" stroke-linecap="round"/>' for x,y in [(42,56),(50,56),(46,64),(54,64),(42,72),(50,72)])
c+='<path d="M44 26 Q40 8 48 4 Q46 14 50 20 Q54 8 62 8 Q56 16 56 26Z" fill="url(#petFire_'+U+')"/>'
c+=sh('circle','cx="50" cy="37" r="15"','#F97316')+eye(44,35,3.6,'#FDE047')+eye(56,35,3.6,'#FDE047')
c+='<path d="M46 40 L54 40 L50 49Z" fill="#FACC15"/><path d="M46 40 L54 40 L50 44Z" fill="#FDE68A"/>'
ART['pet_phoenix']=c

if __name__=='__main__':
    SMOOTH={'pet_mecha_lion'}
    ts='// TỰ SINH bởi content/tools/pets_gen.py – không sửa tay. Hình thú cưng SVG tĩnh (hệ toạ độ 100x100).\n'
    ts+='export const PET_DEFS = '+json.dumps(DEFS)+';\n'
    ts+='export const PET_ART: Record<string, string> = '+json.dumps(ART,ensure_ascii=False,indent=1)+';\n'
    ts+='export const PET_SMOOTH = new Set(['+','.join(json.dumps(k) for k in SMOOTH)+']);\n'
    ts+="export const PET_ID_BY_RENDER: Record<string, string> = { corgi: 'pet_corgi', cat: 'pet_cat', panda: 'pet_panda', bunny: 'pet_bunny', fox: 'pet_fox', owl: 'pet_owl', unicorn: 'pet_unicorn', dragon: 'pet_dragon', mecha_lion: 'pet_mecha_lion', phoenix: 'pet_phoenix' };\n"
    open('/home/claude/main-audit/repo/src/components/avatar/petArt.ts','w').write(ts)
    out={'defs':DEFS,'art':ART}
    json.dump(out,open('/home/claude/gen/pets.json','w'))
    cells=''.join(f'<svg viewBox="0 0 100 100" width=240 height=240 style="background:#e8f2ff;margin:4px"><defs>{DEFS.replace(U,"t"+str(i))}</defs><g filter="url(#{'petSmooth' if k in ('pet_mecha_lion',) else 'petFur'}_t{i})">{a.replace(U,"t"+str(i))}</g></svg>' for i,(k,a) in enumerate(ART.items()))
    open('/home/claude/gen/pets.html','w').write('<body style="margin:0;display:flex;flex-wrap:wrap">'+cells+'</body>')
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        br=p.chromium.launch(); pg=br.new_page(viewport={'width':1280,'height':540}); pg.goto('file:///home/claude/gen/pets.html'); pg.screenshot(path='/home/claude/gen/pets.png')
