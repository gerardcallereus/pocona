/* ==========================================================================
   POCONA: CONFIGURACIÓ DE PROGRESSIÓ DEL CURS (PANELL DEL PROFESSORAT)
   Fitxer: js/config-curs.js
   
   Com utilitzar aquest fitxer:
   --------------------------------------------------------------------------
   Només cal canviar el número de la variable 'capitolMaximVisible'.
   No cal tocar cap codi HTML!
   
   Valors possibles de 'capitolMaximVisible':
   - 0: Només la pàgina d'Inici (El Repte).
   - 1: Obert fins al Tema 1 (Cooperació) 👈 [CONFIGURAT ACTUALMENT]
   - 2: Obert fins al Tema 2 (Anàlisi).
   - 3: Obert fins al Tema 3 (Terreny i Comunicacions).
   - 4: Obert fins al Tema 4 (Càlcul de Torres).
   - 5: Obert fins al Tema 5 (Sistemes i Energia).
   - 6: Tots els temes oberts al 100%.
   ========================================================================== */

window.CONFIG_CURS = {
  // 🎯 CAPÍTOL MÀXIM VISIBLE ACTUALMENT:
  // Canvia aquest número (de 0 a 6) segons el ritme de la classe:
  capitolMaximVisible: 1,

  // 🔒 COM ES MOSTREN ELS CAPÍTOLS QUE ENCARA NO S'HAN ACTIVAT:
  // - "cadenat": Apareixen al menú amb una icona 🔒 i l'etiqueta «Pròximament».
  // - "ocult"  : Els temes futurs desapareixen completament del menú lateral.
  estilFuturs: "cadenat",

  // 💬 MISSATGE INFORMATIU PER A L'ALUMNAT SI INTENTA ACCEDIR A UN CAPÍTOL FUTUR:
  missatgeBloqueig: "Aquest tema s'obrirà a classe quan finalitzem la fase actual del projecte Pocona."
};

// Àlies de compatibilitat
window.CONFIG_DOCENT = window.CONFIG_CURS;
