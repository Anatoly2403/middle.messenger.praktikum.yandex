import { ArrowButton } from '../components/arrow-button'
import { Avatar } from '../components/avatar'
import { App } from '../core'
import { Button } from '../components/button'
import { FileField } from '../components/file-field'
import { InputField } from '../components/input-field'
import { Link } from '../components/link'
import { TextButton } from '../components/text-button/text-button'
import { TextField } from '../components/text-field/text-field'
import { Modal } from '../components/modal/modal'
import { TStructure } from '../components/modal/types'

const app = new App({
  imports: [
    ArrowButton,
    Avatar,
    Button,
    FileField,
    InputField,
    Link,
    TextButton,
    TextField,
    Modal,
  ],
})

const structure = [
  {
    label: 'label',
    name: 'label',
    type: 'inputField' as const,
  },
]

app.renderDOM(
  '#root',
  new Modal({
    hidden: false,
    label: 'modal',
    btnLabel: 'add',
    btnClick: () => console.log('from main'),
    structure: structure,
  }),
)
