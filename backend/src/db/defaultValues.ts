import { User } from '../user/user.model';
import { Bonsai } from '../bonsai/bonsai.model';
import * as bcrypt from 'bcryptjs';
import { Chapter } from '../chapter/chapter.model';
import { Article } from '../article/article.model';

export const setDefaultValues = async () => {
  if (await User.count() === 0) {
    await User.create({ name: 'Miguel', password: bcrypt.hashSync('1234'), email: 'miguel@clubdelbonsai.com', root: true });
    await User.create({ name: 'Carlos', password: bcrypt.hashSync('1234'), email: 'carlos@clubdelbonsai.com', root: true });
  }

  if (await Bonsai.count() === 0) {
    const bonsai = await Bonsai.create({ name: 'Pipo', level: 1 });
    const bonsai2 = await Bonsai.create({ name: 'Españita', level: 1 });
    const miguel = await User.findOne({ where: { email: 'miguel@clubdelbonsai.com' } });
    const carlos = await User.findOne({ where: { email: 'carlos@clubdelbonsai.com' } });
    await miguel!.setBonsai(bonsai);
    await carlos!.setBonsai(bonsai2);
  }

  if (await Chapter.count() === 0) {
    const chapter1 = await Chapter.create({ title: 'CAPÍTULO I.- DENOMINACIÓN, DOMICILIO, ÁMBITO, FINES Y ACTIVIDADES', order: 100 });
    const chapter2 = await Chapter.create({ title: 'CAPÍTULO II.- PERSONAS ASOCIADAS', order: 200 });
    const chapter3 = await Chapter.create({ title: 'CAPÍTULO III.- ORGANIZACIÓN DE LA ASOCIACIÓN', order: 300 });
    const chapter4 = await Chapter.create({ title: 'CAPÍTULO IV.- EL ÓRGANO DE REPRESENTACIÓN', order: 400 });
    const chapter5 = await Chapter.create({ title: 'CAPÍTULO V.- DISOLUCIÓN DE LA ASOCIACIÓN', order: 500 });

    const article1 = await Article.bulkCreate([{
      title: 'Art. 1º Denominación',
      content: `Se constituye la Asociación denominada CLUB DEL BONSÁI que se
        acoge a lo dispuesto en la Ley Orgánica 1/2002, de 22 de marzo, reguladora
        del Derecho de Asociación y a la Ley 14/2008, de 18 de noviembre de
        Asociaciones de la Comunitat Valenciana, y al amparo de lo dispuesto en el
        artículo 22 de la Constitución, careciendo de ánimo de lucro.`,
      order: 100,
    }, {
      title: 'Art. 2º Personalidad Jurídica',
      content: `La Asociación tiene personalidad jurídica propia y capacidad plena de
        obrar para administrar y disponer de sus bienes y cumplir los fines que se
        propone.`,
      order: 200,
    }, {
      title: 'Art. 3º Domicilio y ámbito de actuación',
      content: `El domicilio de la Asociación se establece en SAN VICENTE DEL
        RASPEIG, calle ALICANTE, Nº 84 (Mad Pilots San Vicente del Raspeig), código
        postal 03690
        En caso de omisión o imposibilidad de reunión en el mismo, el
        domicilio pasará de forma temporal a calle DECANO, Nº 2 (Mad Pilots
        Universidad)
        La Asociación realizará principalmente sus actividades en el ámbito
        LOCAL, pudiéndose en un futuro extender a ámbitos mayores. `,
      order: 300,
    }, {
      title: 'Art. 4º Fines',
      content: `Constituyen los fines de la Asociación: Fomentar las relaciones de
        grupo, así como fortalecer los lazos entre los miembros, y a su vez,
        promover la no necesidad de pareja afectiva ni la existencia de relaciones
        sexuales. `,
      order: 400,
    }, {
      title: 'Art. 5º Actividades',
      content: `Para el cumplimiento de los fines enumerados en el artículo anterior,
        se realizarán las siguientes actividades: organización de reuniones grupales,
        realización de viajes, así como la planificación de reuniones reducidas de
        sus miembros para ayudar mejor al funcionamiento del grupo. `,
      order: 500,
    }]);

    const article2 = await Article.bulkCreate([{
      title: 'Art. 6º Capacidad',
      content: `Podrán formar parte de la Asociación todas las personas físicas que cumplan los principios:
        No hayan tenido relaciones de pareja o en su defecto que no tengan actualmente.
        No tener relaciones sexuales de forma periódica.
        Deberán presentar una solicitud por escrito al órgano de representación, y este resolverá en la primera reunión que celebre si el solicitante se ajusta a las condiciones exigidas en los estatutos; el órgano de representación no le podrá denegar la admisión, pero sí que tiene derecho de suspensión del trámite de admisión del individuo. Una vez suspendido el trámite se reunirá la Asamblea General para someter a votación la admisión del solicitante, en caso de obtener mayoría simple, este pasará a ser miembro de la asociación, en caso contrario quedará denegada su entrada y no podrá solicitar de nuevo la admisión hasta un mes después de la publicación del resultado.
        Como medida excepcional, podrá ingresar una persona física en la Asociación que, aun no cumpliendo los requisitos anteriormente mencionados, obtenga un apoyo unánime por el gobierno de representación.
        En caso de aceptación por parte de la Junta de Gobierno, el individuo pasará a formar parte de la Asociación, aunque pierde el derecho de toma de decisiones en el futuro de la organización.
        En caso que los miembros de la Asociación presenten una disconformidad respecto a la admisión del nuevo miembro, podrán presentar un escrito de disconformidad en un plazo de 7 días. Una vez presentado el escrito, la Junta estará obligada a convocar lo antes posible a la Asamblea General donde cada uno de los miembros con plenos derechos de la organización tendrán voz y voto respecto al ingreso del nuevo miembro.
        Una vez hecho el debate general, se dará paso a la votación, donde el nuevo miembro deberá obtener la mayoría simple por parte de la Asamblea, en caso de obtenerlo pasará a ser Miembro Maceta de la Asociación, en caso contrario quedará denegada su admisión y dejará de pertenecer a la organización.
          La condición de persona asociada es intransmisible.
        `,
      order: 100,
    }, {
      title: 'Art. 7º Derechos de las personas asociadas',
      content: `Los derechos que corresponden a las personas asociadas son los siguientes:
          A participar en las actividades de la Asociación
          A ser informadas acerca de la composición de los órganos de gobierno y representación de la Asociación, así como el desarrollo de su actividad.
          A ser informados de cualquier reunión que haga la Asociación
          A ser oídos con carácter previo a la adopción de medidas disciplinarias contra ellos y a ser informados de los hechos que dan lugar a tales medidas, debiendo ser motivado el acuerdo que, en su caso, imponga la sanción.
          A impugnar los acuerdos de los órganos de la Asociación que estimen contrarios a los Estatutos
          A conocer los Estatutos y los reglamentos y normas de funcionamientos aprobados por los órganos de la Asociación.Asimismo, tendrá derecho a que se le facilite copia de los Estatutos vigentes y del Reglamento de Régimen Interno de la Asociación, si existiese.`,
      order: 200,
    }, {
      title: 'Art. 8 Deberes de las personas asociadas',
      content: `Los deberes de las personas asociadas son:
          Compartir las finalidades de la Asociación y colaborar por la consecución de los mismas.
          Acatar y cumplir los acuerdos válidamente adoptados por los órganos de gobierno y representación de la Asociación.
          Ayudar en la medida de lo posible a todos y cada uno de los miembros de la Asociación.
          Resolver los problemas de carácter interno que puedan surgir por el conflicto entre miembros, sin la exclusión de ninguno de ellos.`,
      order: 300,
    }, {
      title: 'Art. 9º Causas de baja ',
      content: `Son causa de baja en la Asociación:
          Si alguno de sus miembros incumple alguno de los principios mencionados en el Art. 6.
          Si la Junta Directiva decide la expulsión de alguno de sus miembros bajo causa justificada.`,
      order: 400,
    }, {
      title: 'Art. 10º Régimen Sancionador',
      content: `La separación de la Asociación de las personas asociadas por motivo de sanción tendrá lugar cuando cometan actos que los hagan indignos de seguir perteneciendo a aquella. Se presumirá que existe este tipo de actos:
          Cuando deliberadamente la persona asociada impida o ponga obstáculos al cumplimiento de los fines sociales de la organización.
          Cuando intencionadamente obstaculice el funcionamiento de los órganos de gobierno y representación de la Asociación.
          Cuando este afecte de forma grave a la convivencia del grupo.
          Cuando el individuo ataque o hiera tanto físicamente como psicológicamente a otro integrante del grupo.
          Mentir sobre su estado actual.
          En cualquier caso, para la imposición de la sanción de separación por parte del órgano de gobierno, será necesario la tramitación de un expediente disciplinario instruido por un órgano diferente al competente para resolverlo y que garantice los derechos de las personas asociadas a las que se instruye el procedimiento a ser informadas de la acusación y a formular alegaciones frente a la misma, así como notificar a la Asamblea General. Este órgano será constituido mediante sorteo de los miembros de la Asamblea General, siempre que tengan los plenos derechos sobre la misma.
          Si el órgano aprueba la decisión sancionadora será cargo de la Junta de Gobierno la aplicación de la misma y la expulsión del miembro de la Asociación. El plazo de prescripción de las infracciones y sanciones será de 3 años.`,
      order: 500,
    }]);

    const article3 = await Article.bulkCreate([{
      title: 'Art. 11º Clasificación de miembros',
      content: `Dentro de la Asociación, cada miembro estará clasificado según un rango que le será asignado.
        Para ello, se creará un sistema de niveles, en el que el individuo obtendrá puntos dependiendo del tiempo transcurrido sin la practicar relaciones sexuales.`,
      order: 100,
    }, {
      title: 'Art. 12º Sistema de puntos',
      content: `El sistema de niveles tendrá un carácter impositivo, ninguno de sus miembros podrá denegar o modificarlo de forma directa, y le será asignado en el momento de adhesión a la Asociación.
        Este sistema de puntos irá ligado al tiempo que lleve el individuo sin la práctica de relaciones sexuales, de esta manera, cada año que permanezca sin la práctica obtendrá un punto.
        El sistema de puntos es acumulativo y no tendrá límite superior.`,
      order: 200,
    }, {
      title: 'Art. 13º Penalizaciones del sistema de puntos',
      content: `El individuo perderá todos sus puntos si:
        Tiene algún tipo de relación sexual.
        Tener más de tres parejas, independientemente de su duración, en el periodo de un año aun sin haber tenido relaciones sexuales. La Junta Directiva será la encargada de determinar si el individuo se encuentra en una relación.
        La aplicación de la penalización será cargo de la Junta Directiva sin posibilidad de modificación o anulación de la misma.
          En caso de duda sobre la realización de alguno de estos puntos por parte de un individuo, se suspenderá de manera temporal el nivel miembro y se abrirá una Comisión de Investigación con el fin de aclarar los hechos. Será cargo de la Junta Directiva la elección de los miembros de la comisión ya sea de forma directa o por sorteo.
        La comisión deberá redactar un informe donde esclarezca lo sucedido respecto a la supuesta infracción. Una vez redactado el informe se convocará a la Asamblea General donde se presentará dicho informe al resto de miembros. Se iniciará pues un debate donde el miembro acusado podrá defenderse de lo presentado por la Comisión de Investigación. Finalizado este debate, se procederá a una votación conjunta donde será necesario la mayoría simple para culpar o exculpar al miembro acusado.`,
      order: 300,
    }, {
      title: 'Art. 14º Clasificación complementaria',
      content: `Además del sistema de puntos, se clasificará al individuo en uno de los siguientes grupos dependiendo de su forma de enfrentarse a las relaciones:
        Cactus: Persona que, sin querer tener una relación sentimental, daña a otras personas haciéndole esperanzas o manipulandolas de forma intencionada o no.
        Bonsái Esporas: Persona que se esfuerza en tener una pareja sentimental sin obtener resultado.
        Bonsái: Persona que no tiene interés de tener una pareja sentimental actualmente.
        Miembro Maceta: Persona que, incumpliendo los principios del Art. 6, es aceptada en la Asociación.  Aunque sin derecho a voto.
        La asignación de los miembros a cada uno de estos grupos será responsabilidad de la Junta Directiva.
        Los individuos podrán cambiar de grupo con el tiempo si su actitud se corresponde con las mencionadas anteriormente.`,
      order: 400,
    }, {
      title: 'Art. 15º Delito de Alta Traición',
      content: `Podrán ser acusados de Delito de Alta Traición:
        Aquellas personas que, siendo preguntadas directamente, oculten o mientan sobre un tema de alto interés para la organización.
        Aquellas personas que mientan sobre el cumplimiento de los puntos del Art. 13
        Como excepción, no podrán ser acusadas del delito de Alta Traición aquellas personas que oculten temas a la sociedad ya sea por tratarse de un tema traumático o no sentirse preparadas emocionalmente.
        La Junta Directiva será la responsable de imponer una sanción al miembro en cuestión, no pudiendo ser esta la expulsión del socio.`,
      order: 500,
    }, {
      title: 'Art. 16º Casos de excepción',
      content: `No será penalizado con la pérdida de puntos:
        Cualquier persona que haya sido obligada forzosamente a practicar relaciones sexuales.
        Cualquier individuo que no fuese plenamente consciente de sus actos debido a sustancias estupefacientes, así como no tener capacidad de decisión.
        Como compensación en cualquiera de los casos, la Junta Directiva podrá otorgar una mención especial a dicho miembro obsequiándole con la Estrella Bonsái como compensación de su valor y mostrar de esta manera el apoyo de la Asociación ante la situación del socio.`,
      order: 600,
    }]);

    const article4 = await Article.bulkCreate([{
      title: 'Art. 17º Composición del órgano de representación',
      content: `La Asociación la regirá, administrará y representará el órgano de representación denominado Junta Directiva, formado por la/el Presidenta/e, Vicepresidenta/e, Secretaria/o, Tesorera/o y Vocales.
        Los cargos de Presidenta/e, Secretaria/o y Tesorera/o deben de recaer en personas diferentes.
        El ejercicio del cargo será gratuito.
        La Junta Directiva como máximo puede estar formada por la/el Presidenta/e, Vicepresidenta/e, Secretaria/o, Tesorera/o y 3 Vocales.`,
      order: 100,
    }, {
      title: 'Art. 18º Constitución del órgano de representación',
      content: `La elección de la/del Presidenta/e de la Asociación será mediante el sistema de rangos, siendo elegido el miembro de la Asociación que mayor nivel tenga en ese momento. En caso de empate, será elegida la persona de mayor edad.
        Es competencia de la/del Presidenta/e la formación de la Junta Directiva, eligiendo el número de cargos que la forman así como sus miembros.`,
      order: 200,
    }, {
      title: 'Art. 19º Duración del mandato en el órgano de representación',
      content: `El periodo de mandato de la/del Presidenta/e será ilimitado, pudiendo ser destituido únicamente:
        Por voluntad propia, presentando un escrito de dimisión donde razonen los motivos.
        Si durante su mandato pierde la totalidad de los puntos.
        Causar baja como miembro de la Asociación.
        En caso de defunción.
        En el caso de que la/el Presidenta/e incumpla el primer principio de Art.6, será suspendida/o  de manera temporal, pasando a ser la/el Vicepresidenta/e la máxima representación de la Asociación mientras la/el Presidenta/e esté bajo suspensión.
          Si la/el Presidenta/e persiste en el cumplimiento del primer principio durante el periodo de un mes, será destituida/o de manera inmediata de su cargo y se iniciará la formación de un nuevo Gobierno con la asignación de una/un nueva/o Presidenta/e.
        Los miembros del órgano de representación ejercerán su cargo de forma ilimitada, mientras el mandato de la/ del Presidenta/e dure.
        El cese en el cargo de los miembros antes de extinguirse el término reglamentario podrá deberse a:
        Dimisión voluntaria presentada mediante un escrito en el que se razonen los motivos.
        Enfermedad que incapacite para el cargo.
        Causar baja como miembro de la Asociación.
        Pérdida total de puntos de rango.
        Sanción impuesta por una falta cometida en el ejercicio del cargo.
        Voluntad de la/del Presidenta/e.
        Las vacantes que se produzcan en el órgano de representación se cubrirán con la máxima antelación posible mediante la designación de un nuevo miembro por parte de la/del Presidenta/e.
        Los miembros pertenecientes a la Junta Directiva no podrán tener rango nulo.`,
      order: 300,
    }, {
      title: 'Art. 20º Competencias del órgano de representación',
      content: `El órgano de representación posee las facultades siguientes:
        Ostentar y ejercitar la representación de la Asociación y llevar a término la dirección y la administración de la manera más amplia que reconozca la ley siendo fiel siempre a los Estatutos vigentes en dicho momento.
        Tomar los acuerdos necesarios para la comparecencia ante los organismos públicos, para el ejercicio de toda clase de acciones legales y para interponer los recursos pertinentes.
        Resolver sobre la admisión de nuevos asociados, llevando la relación actualizada de todos los socios.
        Presentar el balance y el estado de la asociación de forma periódica al resto de integrantes.
        Llevar una contabilidad conforme a las normas específicas que permitan obtener la imagen fiel del patrimonio, del resultado y de la situación financiera de la entidad.
        Efectuar el inventario de los bienes de la Asociación.
        Elaborar la memoria de actividades y someterla a la aprobación de los miembros.
        Resolver provisionalmente cualquier caso no previsto por los presentes Estatutos.
        Así como la reforma de artículos de los presentes Estatutos con el apoyo unánime de la Junta Directiva.`,
      order: 400,
    }, {
      title: 'Art. 21º Reuniones del órgano de representación',
      content: `El órgano de representación, convocado previamente por la/el Presidenta/e o por la persona que le sustituya, se reunirá en sesión ordinaria con la periodicidad que sus miembros decidan, que en todo caso no podrá ser superior a un mes. Se reunirán en sesión extraordinaria si lo solicita un tercio de sus componentes.
        El órgano de representación quedará válidamente constituido con convocatoria previa y un quórum de la mitad más uno de sus miembros.
        Los miembros del órgano de representación están obligados a asistir a todas las reuniones que se convoquen, pudiendo excusar su asistencia por causas justificadas. En cualquier caso, será necesaria la asistencia de la/el Presidenta/e y de la/del Secretaria/o o de las personas que los sustituyan.
        En el órgano de representación se tomarán los acuerdos por mayoría simple de votos de los asistentes. En caso de empate, el voto de la/del Presidenta/e será de calidad.`,
      order: 500,
    }, {
      title: 'Art. 22º La/el Presidenta/e',
      content: `La/el Presidenta/e de la Asociación también será Presidenta/e del órgano de representación:
        Son propias de la/del Presidenta/e, las siguientes funciones:
        Las de dirección y representación legal de la Asociación.
        La presidencia y la dirección de los órganos de gobierno y de representación.
        Visar las actas y los certificados confeccionados por la/el Secretaria/o de la Asociación.
        Las atribuciones restantes propias del cargo y establecidas en los Estatutos vigentes.
        Derecho a veto de las leyes aprobadas por el órgano.
        La/el Presidenta/e será sustituido en caso de ausencia o enfermedad por la/el Vicepresidenta/e o el/la Vocal del órgano de representación.`,
      order: 600,
    }, {
      title: 'Art. 23º La/el Tesorera/o',
      content: `La/el Tesorera/o tendrá como función la custodia y el control de los recursos de la Asociación, así como la elaboración de presupuestos, el balance, inventario y liquidación de cuentas. Firmará los recibos, cuotas y otros documentos de tesorería. Pagará las facturas aprobadas por el órgano de representación, las cuales tendrás que ser visadas previamente por la/el Presidenta/e.`,
      order: 700,
    }, {
      title: 'Art. 24º La/el Secretaria/o',
      content: `El/la Secretaria/o debe custodiar la documentación de la Asociación, redactar y firmar las actas de reuniones de los órganos de gobierno y representación, redactar y autorizar las certificaciones que haya que librar, así como tener actualizada la relación de los asociados.`,
      order: 800,
    }]);

    const article5 = await Article.bulkCreate([{
      title: 'Art. 25º Causas de Disolución',
      content: `La asociación se disolverá:
        Si así lo acuerdan los miembros de la Asociación convocados expresamente para este fin y con el voto favorable de más de la mitad de las personas presentes o representadas y el voto favorable de la/del Presidenta/e.
        Por sentencia judicial firme.
        Por baja de todas las personas asociadas.`,
      order: 100,
    }, {
      title: 'Art. 26º Liquidación',
      content: `La disolución de la asociación abre el período de liquidación, hasta el fin del cual la entidad conservará su entidad jurídica.
        Los miembros del órgano de representación en el momento de la disolución se convierten en liquidadores salvo que el juez, en su caso, acuerde en su resolución judicial.
        Corresponde a los liquidadores:
        Velar por la integridad del patrimonio de la Asociación y llevar sus cuentas.
        Concluir las operaciones pendientes y efectuar las nuevas que sean precisas para la liquidación.
        Liquidar el patrimonio.
        Aplicar los bienes sobrantes de la asociación a los fines previstos por los Estatutos, a excepción de las aportaciones adicionales.
        Solicitar la cancelación de los asientos en el Registro correspondientes.
        Así como informar a todos los antiguos miembros de la disolución de la Asociación.
        En caso de insolvencia de la asociación, el órgano de representación, o si es el caso, los liquidadores han de promover inmediatamente el oportuno procedimiento concursal ante el juez competente.
        En remanente neto que resulte de la liquidación se destinará directamente a LOS ÚLTIMOS MIEMBROS PERTENECIENTES A LA ASOCIACIÓN en el momento de la disolución.
        Las personas asociadas no responden personalmente de las deudas de la asociación.
        Los miembros o titulares de los órganos de gobierno y representación, y las demás personas que obren en su nombre y representación de la asociación, responderán ante ésta, antes los asociados y ante terceros por los daños causados y las deudas contraídas por actos dolosos, culposos o negligentes.`,
      order: 200,
    }]);

    await chapter1.setArticles(article1);
    await chapter2.setArticles(article2);
    await chapter3.setArticles(article3);
    await chapter4.setArticles(article4);
    await chapter5.setArticles(article5);
  }
};
