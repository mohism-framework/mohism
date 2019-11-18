#/usr/bin/env bash
_undefined_completions()
{
  COMPREPLY=($(compgen -W "init create run ts-kit pu upgrade" "${COMP_WORDS[1]}"))
}

complete -F _undefined_completions undefined
